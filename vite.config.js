import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import replace from '@rollup/plugin-replace';
import process from 'process';
import { pwaOptions } from './pwa';

const replaceOptions = { __DATE__: new Date().toISOString(), preventAssignment: true };
const claims = process.env.CLAIMS === 'true';
const reload = process.env.RELOAD_SW === 'true';
const selfDestroying = process.env.SW_DESTROY === 'true';

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src';
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
  pwaOptions.strategies = 'injectManifest';
  pwaOptions.manifest.name = 'PWA Inject Manifest';
  pwaOptions.manifest.short_name = 'PWA Inject';
}

if (claims) pwaOptions.registerType = 'autoUpdate';

if (reload) {
  replaceOptions.__RELOAD_SW__ = 'true';
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions), replace(replaceOptions)],
  resolve: {
    alias: {
      '~': path.resolve(process.cwd(), './src'),
      static: path.resolve(process.cwd(), './public/static'),
    },
  },
  build: {
    outDir: 'build',
  },
});
