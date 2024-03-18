import { ElectronAPI } from '@electron-toolkit/preload'
import { webContents } from 'electron'
import { api } from 'src/preload/index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}
