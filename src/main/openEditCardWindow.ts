import { BrowserWindow, ipcMain, shell } from 'electron'
import icon from '../../resources/icon.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

function setupOpenEditCardWindow(parent: BrowserWindow): void {
  ipcMain.on('open-edit-card-window', (_event, IDOfCardToEdit: number) => {
    const openEditCardWindow = new BrowserWindow({
      width: 900,
      height: 560,
      x: 600,
      y: 100,
      modal: true,
      parent: parent,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    openEditCardWindow.on('ready-to-show', () => {
      openEditCardWindow.show()

      // Change default page of new window
      openEditCardWindow.webContents.send('changeRoute', '/editCard', IDOfCardToEdit)
    })

    openEditCardWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      openEditCardWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      openEditCardWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  })
}

export default setupOpenEditCardWindow
