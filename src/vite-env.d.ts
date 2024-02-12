/// <reference types="vite/client" />

// add env typings here
interface ImportMetaEnv {
  readonly VITE_REACT_APP_AUTH0_DOMAIN: string;
  readonly VITE_REACT_APP_AUTH0_CALLBACK_URL: string;
  readonly VITE_REACT_APP_AUTH0_CLIENT_ID: string;
  readonly VITE_REACT_APP_MAPBOX_KEY: string;
  // generated dynamically
  readonly VITE_GIT_BRANCH_NAME: string;
  // generated dynamically
  readonly VITE_GIT_COMMIT_HASH: string;
  readonly VITE_REACT_APP_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
