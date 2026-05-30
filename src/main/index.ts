import { app, BrowserWindow, Menu, Tray, clipboard, globalShortcut, ipcMain, nativeImage, screen } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIslandBounds, type IslandSize } from './window-position.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COMPACT_SIZE: IslandSize = { width: 360, height: 68 };
const EXPANDED_SIZE: IslandSize = { width: 430, height: 560 };
const TOP_OFFSET = 14;

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

function createWindow(): BrowserWindow {
  const display = screen.getPrimaryDisplay();
  const bounds = getIslandBounds({
    workArea: display.workArea,
    size: COMPACT_SIZE,
    topOffset: TOP_OFFSET
  });

  const window = new BrowserWindow({
    ...bounds,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: false,
    hasShadow: false,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  window.setAlwaysOnTop(true, 'screen-saver');
  window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  window.once('ready-to-show', () => window.show());

  const devServerUrl = process.env.VITE_DEV_SERVER_URL;
  if (devServerUrl) {
    void window.loadURL(devServerUrl);
    window.webContents.openDevTools({ mode: 'detach' });
  } else {
    void window.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  return window;
}

function setIslandSize(size: IslandSize): void {
  if (!mainWindow) {
    return;
  }

  const display = screen.getDisplayNearestPoint(mainWindow.getBounds());
  const bounds = getIslandBounds({
    workArea: display.workArea,
    size,
    topOffset: TOP_OFFSET
  });
  mainWindow.setBounds(bounds, true);
}

function createTray(): Tray {
  const icon = nativeImage.createFromDataURL(
    `data:image/svg+xml;base64,${Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" rx="8" fill="#0b0d12"/><circle cx="8" cy="8" r="4" fill="#61f4ff"/></svg>'
    ).toString('base64')}`
  );

  const appTray = new Tray(icon);
  appTray.setToolTip('Windows Dynamic Island');
  appTray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Show island', click: () => mainWindow?.show() },
      { label: 'Hide island', click: () => mainWindow?.hide() },
      { label: 'Expand island', click: () => setIslandSize(EXPANDED_SIZE) },
      { type: 'separator' },
      { label: 'Quit', click: () => app.quit() }
    ])
  );

  return appTray;
}

function registerIpc(): void {
  ipcMain.handle('clipboard:readText', () => clipboard.readText());
  ipcMain.handle('clipboard:writeText', (_event, text: string) => {
    clipboard.writeText(text);
  });
  ipcMain.handle('island:show', () => mainWindow?.show());
  ipcMain.handle('island:hide', () => mainWindow?.hide());
  ipcMain.handle('island:expand', () => setIslandSize(EXPANDED_SIZE));
  ipcMain.handle('island:collapse', () => setIslandSize(COMPACT_SIZE));
  ipcMain.handle('app:quit', () => app.quit());
  ipcMain.handle('app:getVersion', () => app.getVersion());
}

function registerShortcuts(): void {
  globalShortcut.register('CommandOrControl+Shift+Space', () => {
    if (!mainWindow) {
      return;
    }
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    mainWindow?.show();
    setIslandSize(EXPANDED_SIZE);
  });
}

app.setName('Windows Dynamic Island');

void app.whenReady().then(() => {
  registerIpc();
  mainWindow = createWindow();
  tray = createTray();
  registerShortcuts();

  if (process.env.WDI_SMOKE_EXIT === '1') {
    setTimeout(() => app.quit(), 1200);
  }
});

app.on('window-all-closed', () => {
  mainWindow = null;
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  tray?.destroy();
});
