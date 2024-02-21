import { ipcMain } from 'electron'
import Store from 'electron-store'
import { Card, DatabaseSchema } from '../types/types'

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
