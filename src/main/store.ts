import { BrowserWindow, ipcMain } from 'electron'
import Store from 'electron-store'
import { Card, DatabaseSchema, Deck } from '../types/types'

const store = new Store<DatabaseSchema>()

function storeContainsCardWithFront(frontOfCardToGet: string): Card | null {
  if (!store.has('cards')) return null

  const cards = store.get('cards')
  let card: Card
  for (card of cards) {
    if (card.cardFront == frontOfCardToGet) {
      return card
    }
  }

  return null
}

function storeContainsCardWithID(IDOfCardToGet: number): Card | null {
  if (!store.has('cards')) return null

  const cards = store.get('cards')
  let card: Card
  for (card of cards) {
    if (card.cardID == IDOfCardToGet) {
      return card
    }
  }
  return null
}

function setupElectronStore(window: BrowserWindow): void {
  ensureDefaultDeckExists()
  // // Just for testing. Don't use, make your own
  // ipcMain.on('electron-store-get', async (event, val) => {
  //   event.returnValue = store.get(val)
  // })
  // // Just for testing. Don't use, make your own
  // ipcMain.on('electron-store-set', async (event, key, val) => {
  //   store.set(key, val)
  // })

  ipcMain.on('electron-store-push-deck-to-show', async (_event, name: string) => {
    store.set('deckToShow', name)
  })
  ipcMain.handle('electron-store-get-deck-to-show', async (event) => {
    return store.get('deckToShow')
  })
  ipcMain.on('electron-store-add-deck', async (_event, newDeck: Deck) => {
    if (!store.has('decks')) {
      store.set('decks', [newDeck])
    } else {
      const decks = [...store.get('decks'), newDeck]
      store.set('decks', decks)
    }
  })
  ipcMain.on('electron-store-delete-deck', async (_event, name: string) => {
    const currentCardList = store.get('cards')

    const cardsOfDeletedDeck = currentCardList.filter((x) => x.belongsToDeck.includes(name))
    const updatedCards: Card[] = []

    for (let i = 0; i < cardsOfDeletedDeck.length; i++) {
      const card = cardsOfDeletedDeck[i]
      const nameIndex = card.belongsToDeck.findIndex((x) => x.localeCompare(name) == 0)

      if (nameIndex != -1) {
        card.belongsToDeck.splice(nameIndex)
      }
      if (card.belongsToDeck.length == 0) {
        card.belongsToDeck.push('DEFAULT')
      }
      updatedCards.push(card)
    }

    const untouchedCards = store.get('cards').filter((x) => !x.belongsToDeck.includes(name))
    store.set('cards', untouchedCards.concat(updatedCards))

    const currentDeckList = store.get('decks')
    const newDeckList = currentDeckList.filter((x) => x.name.localeCompare(name) != 0)
    store.set('decks', newDeckList)
  })
  ipcMain.handle('electron-store-get-deck', async (_event, name: string) => {
    const allCards = store.get('cards')
    if (allCards !== undefined && allCards.length > 0)
      return store.get('cards').filter((x) => x.belongsToDeck.includes(name))
    return []
  })
  ipcMain.handle('electron-store-get-all-decks', async (event) => {
    return store.has('decks') ? store.get('decks') : []
  })

  ipcMain.on('electron-store-add-card', async (_event, cardToAdd: Card) => {
    // Store has no cards
    if (!store.has('cards')) {
      store.set('cards', [cardToAdd])
      return
    }

    // Store already has cards

    // Update existing card
    if (storeContainsCardWithID(cardToAdd.cardID!)) {
      // Remove old card with same i, to add back in new card later
      const cardsWithoutOldCard = [...store.get('cards')].filter(
        (card) => card.cardID != cardToAdd.cardID
      )

      const cardsWithNewCard = [...cardsWithoutOldCard, cardToAdd]

      store.set('cards', cardsWithNewCard)
      // console.log('updating card')
      window.webContents.send('on-electron-store-cards-updated')

      // if (window && window.webContents.isDestroyed() && !window.isDestroyed())
      //   window.webContents.send('on-electron-store-cards-updated')
      return
    }

    let highestCardID = -1

    store.get('cards').forEach((card) => {
      if (card.cardID! > highestCardID) {
        highestCardID = card.cardID!
      }
    })

    cardToAdd.cardID = highestCardID + 1

    // Only add to store if no card in the store has the card to add's name
    const cards = [...store.get('cards'), cardToAdd]
    store.set('cards', cards)
    // console.log('adding/updating card')
    window.webContents.send('on-electron-store-cards-updated')
    // if (window && window.webContents.isDestroyed() && !window.isDestroyed())
    //   window.webContents.send('on-electron-store-cards-updated')
    return
  })
  ipcMain.handle('electron-store-get-card-by-front', async (event, frontOfCardToGet) => {
    return storeContainsCardWithFront(frontOfCardToGet)
  }),
    ipcMain.handle('electron-store-get-card-by-ID', async (event, IDOfCardToGet) => {
      return storeContainsCardWithID(IDOfCardToGet)
    }),
    ipcMain.handle('electron-store-get-all-cards', async (event) => {
      // If it already has cards
      if (store.has('cards')) {
        return store.get('cards')
      }
      // It has no cards, so can't get any. Just return empty array
      else {
        return []
      }
    })
  ipcMain.handle('electron-store-delete-card-by-id', async (_event, IDOfCardToDelete) => {
    const cards = [...store.get('cards')]

    const newCards = cards.filter((card) => {
      return card.cardID != IDOfCardToDelete
    })

    store.set('cards', newCards)
    window.webContents.send('on-electron-store-cards-updated')
    // if (window && window.webContents.isDestroyed() && !window.isDestroyed())
    //   window.webContents.send('on-electron-store-cards-updated')
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function ensureDefaultDeckExists() {
  const decks = store.has('decks') ? store.get('decks') : []
  const hasDefaultDeck = decks.some((deck) => deck.name === 'DEFAULT')

  if (!hasDefaultDeck) {
    const defaultDeck = { name: 'DEFAULT', cards: [] } // Assuming the structure of a Deck object
    store.set('decks', [...decks, defaultDeck])
    console.log('Added "DEFAULT" deck to the database.')
  }
}

export default setupElectronStore
