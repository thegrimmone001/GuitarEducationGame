import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      // Auto-inject service worker registration.
      injectRegister: "auto",
      registerType: "autoUpdate",
      includeAssets: [
        "Guitar_FretBoard_Horizontal-Complete.svg",
        "Guitar_FretBoard_Horizontal-Complete_v2i.svg",
        "Guitar-Notes_Tab_Staff-Blank-3Measures.svg",
        "icons/icon-192.png",
        "icons/icon-512.png",
      ],
      manifest: {
        name: "GuitarEdu UI",
        short_name: "GuitarEdu",
        start_url: ".",
        scope: ".",
        display: "standalone",
        background_color: "#111111",
        theme_color: "#111111",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Offline asset boundary: keep this conservative to avoid caching dev-only artifacts.
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"]
      }
    }),
  ],
  server: {
    port: 5173,
    strictPort: true
  }
});
