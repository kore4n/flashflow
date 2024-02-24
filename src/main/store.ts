import { ipcMain } from 'electron'
import Store from 'electron-store'
import { Card, DatabaseSchema, Deck } from '../types/types'

const store = new Store<DatabaseSchema>()

function storeContainsCardWithName(nameOfCardToGet: string): Card | null {
  if (!store.has('cards')) return null

  const cards = store.get('cards')
  let card: Card
  for (card of cards) {
    if (card.name == nameOfCardToGet) {
      return card
    }
  }

  return null
}

function setupElectronStore(): void {
  // // Just for testing. Don't use, make your own
  // ipcMain.on('electron-store-get', async (event, val) => {
  //   event.returnValue = store.get(val)
  // })
  // // Just for testing. Don't use, make your own
  // ipcMain.on('electron-store-set', async (event, key, val) => {
  //   store.set(key, val)
  // })

  ipcMain.on('electron-store-add-deck', async (event, newDeck: Deck) => {
    if (!store.has('decks')) {
      store.set('decks', [newDeck]);
    }
    else {
      // enforce unique name later maybe?
      var decks = [...store.get('decks'), newDeck];
      store.set('decks', decks);
    }
  })
  ipcMain.on('electron-store-delete-deck', async (event, name: string) => {

    var currentDeckList = store.get('decks');
    var newDeckList = currentDeckList.filter(x => x.name.localeCompare(name) != 0);
    store.set('decks', newDeckList);
  })
  ipcMain.handle('electron-store-get-deck', async (event, name: string) => {
    return store.get('decks').find(x => x.name = name);
  })
  ipcMain.handle('electron-store-get-all-decks', async (event) => {
    return store.has('decks') ? store.get('decks') : [];
  })

  ipcMain.on('electron-store-add-card', async (event, cardToAdd: Card) => {
    // Store has no cards
    if (!store.has('cards')) {
      store.set('cards', [cardToAdd])
      return
    }

    // Store already has cards
    if (storeContainsCardWithName(cardToAdd.name)) return

    // Only add to store if no card in the store has the card to add's name
    const cards = [...store.get('cards'), cardToAdd]
    store.set('cards', cards)
    return
  })
  ipcMain.handle('electron-store-get-card-by-name', async (event, nameOfCardToGet) => {
    return storeContainsCardWithName(nameOfCardToGet)
  })
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
}

export default setupElectronStore
