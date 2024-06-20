/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_URL_LOGIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}