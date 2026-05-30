/// <reference types="vite/client" />

import type { IslandBridge } from './preload/island-api';

declare global {
  interface Window {
    island: IslandBridge;
  }
}
