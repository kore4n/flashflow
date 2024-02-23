import { ElectronAPI } from '@electron-toolkit/preload'
import { api } from 'src/preload/index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}
