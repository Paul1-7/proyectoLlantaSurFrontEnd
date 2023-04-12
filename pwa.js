export const pwaOptions = {
  mode: 'production',
  base: '/',
  includeAssets: ['favicon/*.png', 'favicon/*.ico'],
  manifest: {
    name: 'SURLLANTAS',
    short_name: 'SURLLANTAS',
    description: 'Tienda de repuestos automotrices y todo tipo de llantas',
    display: 'fullscreen',
    theme_color: '#000000',
    background_color: '#ffffff',
    icons: [
      {
        src: 'favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
};
