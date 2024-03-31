import { ipcMain } from 'electron'
import Store from 'electron-store'
import { Card, DatabaseSchema } from '../types/types'
import { BrowserWindow } from 'electron/main'

const store = new Store<DatabaseSchema>()

function storeContainsCardWithFront(frontOfCardToGet: string): Card | null {
  if (!store.has('cards')) return null

  const cards = store.get('cards')
  let card: Card
  for (card of cards) {
    if (card.front == frontOfCardToGet) {
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
  // // Just for testing. Don't use, make your own
  // ipcMain.on('electron-store-get', async (event, val) => {
  //   event.returnValue = store.get(val)
  // })
  // // Just for testing. Don't use, make your own
  // ipcMain.on('electron-store-set', async (event, key, val) => {
  //   store.set(key, val)
  // })
  ipcMain.on('electron-store-add-card', async (event, cardToAdd: Card) => {
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
      return
    }

    // if (storeContainsCardWithFront(cardToAdd.front)) {
    //   return
    // }

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
    // console.log('adding card')
    window.webContents.send('on-electron-store-cards-updated')
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
  ipcMain.handle('electron-store-delete-card-by-id', async (event, IDOfCardToDelete) => {
    const cards = [...store.get('cards')]

    const newCards = cards.filter((card) => {
      return card.cardID != IDOfCardToDelete
    })

    store.set('cards', newCards)

    window.webContents.send('on-electron-store-cards-updated')
  })
}

export default setupElectronStore
