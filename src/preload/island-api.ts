export interface IslandBridge {
  clipboard: {
    readText: () => Promise<string>;
    writeText: (text: string) => Promise<void>;
  };
  shell: {
    show: () => Promise<void>;
    hide: () => Promise<void>;
    expand: () => Promise<void>;
    collapse: () => Promise<void>;
    quit: () => Promise<void>;
  };
  app: {
    getVersion: () => Promise<string>;
  };
}
