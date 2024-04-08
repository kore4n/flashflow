import { BrowserWindow, ipcMain, shell } from 'electron'
import icon from '../../resources/icon.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

function setupOpenAddCardWindow(parent: BrowserWindow): void {
  ipcMain.on('open-add-card-window', () => {
    const openAddCardWindow = new BrowserWindow({
      width: 900,
      height: 1050,
      x: 600,
      y: 20,
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

    openAddCardWindow.on('ready-to-show', () => {
      openAddCardWindow.show()

      // Change default page of new window
      openAddCardWindow.webContents.send('changeRoute', '/addCard')
    })

    openAddCardWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      openAddCardWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      openAddCardWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  })
}

export default setupOpenAddCardWindow
