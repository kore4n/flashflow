import { IpcRenderer, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Card } from '../types/types'

// Custom APIs for renderer
const api = {
  test: (): void => console.log('Hello world'),
  closeCurrentWindow: (): void => {
    console.log('Should be closing focused window')
    ipcRenderer.send('close-current-window')
  },
  openAddCardWindow: (): void => ipcRenderer.send('open-add-card-window'),
  openEditCardWindow: (cardNameToEdit: string): void =>
    ipcRenderer.send('open-edit-card-window', cardNameToEdit),
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
    addCard(cardObject): void {
      ipcRenderer.send('electron-store-add-card', cardObject)
    },
    getCardByName(cardName): Promise<Card> {
      return ipcRenderer.invoke('electron-store-get-card-by-name', cardName)
    },
    getAllCards(): Promise<Card[]> {
      return ipcRenderer.invoke('electron-store-get-all-cards')
    },
    deleteCardByName(cardName): Promise<Card> {
      return ipcRenderer.invoke('electron-store-delete-card-by-name', cardName)
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
