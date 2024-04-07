import { IpcRenderer, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Card, Deck } from '../types/types'
import os from 'os'

// Custom APIs for renderer
const api = {
  test: (): void => console.log('Hello world'),
  isMac: os.platform() === 'darwin',
  closeCurrentWindow: (): void => {
    console.log('Should be closing focused window')
    ipcRenderer.send('close-current-window')
  },
  openAddCardWindow: (): void => ipcRenderer.send('open-add-card-window'),
  openEditCardWindow: (cardIDToEdit: number): void =>
    ipcRenderer.send('open-edit-card-window', cardIDToEdit),
  openStudySessionWindow: (): void => ipcRenderer.send('open-study-session-window'),
  onChangeRoute: (callback): IpcRenderer =>
    ipcRenderer.on('changeRoute', (event, routeToChangeTo, cardName) => {
      callback(routeToChangeTo, cardName)
    }),

  store: {
    // Just for testing. Make your own
    // get(key): any {
    //   return ipcRenderer.sendSync('electron-store-get', key)
    // },
    // set(property, val): any {
    //   ipcRenderer.send('electron-store-set', property, val)
    // },

    pushDeckToShow(name: string): void {
      ipcRenderer.send('electron-store-push-deck-to-show', name)
    },
    getDeckToShow(): Promise<string> {
      return ipcRenderer.invoke('electron-store-get-deck-to-show')
    },
    addDeck(deck: Deck): void {
      ipcRenderer.send('electron-store-add-deck', deck)
    },
    deleteDeck(name: string): void {
      ipcRenderer.send('electron-store-delete-deck', name)
    },
    getDeckByName(name: string): Promise<Card[]> {
      return ipcRenderer.invoke('electron-store-get-deck', name)
    },
    getAllDecks(): Promise<Deck[]> {
      return ipcRenderer.invoke('electron-store-get-all-decks')
    },

    addCard(cardObject): void {
      ipcRenderer.send('electron-store-add-card', cardObject)
    },
    getCardByFront(cardFront): Promise<Card> {
      return ipcRenderer.invoke('electron-store-get-card-by-front', cardFront)
    },
    getCardByID(cardID): Promise<Card> {
      return ipcRenderer.invoke('electron-store-get-card-by-ID', cardID)
    },
    getAllCards(): Promise<Card[]> {
      return ipcRenderer.invoke('electron-store-get-all-cards')
    },
    deleteCardByID(cardID): Promise<Card> {
      return ipcRenderer.invoke('electron-store-delete-card-by-id', cardID)
    },
    onCardsUpdated(callback): void {
      ipcRenderer.on('on-electron-store-cards-updated', (event, args) => callback())
    }
  }
}

// export api for typescript intellisense used in index.d.ts
export { api }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
