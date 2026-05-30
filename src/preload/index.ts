import { contextBridge, ipcRenderer } from 'electron';
import type { IslandBridge } from './island-api.js';

const islandBridge: IslandBridge = {
  clipboard: {
    readText: () => ipcRenderer.invoke('clipboard:readText'),
    writeText: (text) => ipcRenderer.invoke('clipboard:writeText', text)
  },
  shell: {
    show: () => ipcRenderer.invoke('island:show'),
    hide: () => ipcRenderer.invoke('island:hide'),
    expand: () => ipcRenderer.invoke('island:expand'),
    collapse: () => ipcRenderer.invoke('island:collapse'),
    quit: () => ipcRenderer.invoke('app:quit')
  },
  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion')
  }
};

contextBridge.exposeInMainWorld('island', islandBridge);
