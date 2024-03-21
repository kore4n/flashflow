import { IpcRenderer, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Card, Deck } from '../types/types'

// Custom APIs for renderer
const api = {
  test: (): void => console.log('Hello world'),
  openAddCardWindow: (): void => ipcRenderer.send('open-add-card-window'),
  openStudySessionWindow: (): void => ipcRenderer.send('open-study-session-window'),
  onChangeRoute: (callback): IpcRenderer =>
    ipcRenderer.on('changeRoute', (event, args) => {
      callback(args)
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
      ipcRenderer.send('electron-store-push-deck-to-show', name);
    },
    getDeckToShow(): Promise<string> {
      return ipcRenderer.invoke('electron-store-get-deck-to-show');
    },
    addDeck(deck: Deck): void {
      ipcRenderer.send('electron-store-add-deck', deck);
    },
    deleteDeck(name: string): void {
      ipcRenderer.send('electron-store-delete-deck', name);
    },
    getDeckByName(name: string): Promise<Card[]> {
      return ipcRenderer.invoke('electron-store-get-deck', name);
    },
    getAllDecks(): Promise<Deck[]> {
      return ipcRenderer.invoke('electron-store-get-all-decks');
    },

    addCard(cardObject): void {
      ipcRenderer.send('electron-store-add-card', cardObject)
    },
    getCardByName(cardName): Promise<Card> {
      return ipcRenderer.invoke('electron-store-get-card-by-name', cardName)
    },
    getAllCards(): Promise<Card[]> {
      return ipcRenderer.invoke('electron-store-get-all-cards')
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
