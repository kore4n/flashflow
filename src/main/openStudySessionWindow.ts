import { BrowserWindow, ipcMain, shell } from 'electron'
import icon from '../../resources/icon.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

function setupOpenStudySessionWindow(parent: BrowserWindow): void {
  ipcMain.on('open-study-session-window', () => {
    const openStudySessionWindow = new BrowserWindow({
      width: 900,
      height: 900,
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

    openStudySessionWindow.on('ready-to-show', () => {
      openStudySessionWindow.show()
      // Change default page of new window
      openStudySessionWindow.webContents.send('changeRoute', '/StudyCard')
    })

    openStudySessionWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      openStudySessionWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      openStudySessionWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  })
}

export default setupOpenStudySessionWindow
