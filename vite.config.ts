import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const base = process.env.VITE_BASE_PATH ?? '/'

function generateSeoFilesPlugin() {
  return {
    name: 'generate-seo-files',
    writeBundle() {
      const siteUrl = process.env.VITE_SITE_URL

      if (!siteUrl) {
        return
      }

      const normalizedSiteUrl = siteUrl.replace(/\/$/, '')
      const pageUrl = `${normalizedSiteUrl}/`
      const distDir = path.resolve('dist')

      writeFileSync(
        path.join(distDir, 'robots.txt'),
        ['User-agent: *', 'Allow: /', '', `Sitemap: ${pageUrl}sitemap.xml`, ''].join(
          '\n',
        ),
      )

      writeFileSync(
        path.join(distDir, 'sitemap.xml'),
        [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          '  <url>',
          `    <loc>${pageUrl}</loc>`,
          '    <changefreq>weekly</changefreq>',
          '    <priority>1.0</priority>',
          '  </url>',
          '</urlset>',
          '',
        ].join('\n'),
      )
    },
  }
}

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'apple-touch-icon.png',
        'pwa-192.png',
        'pwa-512.png',
        'splash/apple-750x1334.png',
        'splash/apple-1170x2532.png',
        'splash/apple-1284x2778.png',
        'splash/apple-1290x2796.png',
      ],
      manifest: {
        name: 'Figurinhas Copa',
        short_name: 'Figurinhas',
        description: 'Controle seu álbum de figurinhas da Copa do Mundo',
        theme_color: '#282828',
        background_color: '#282828',
        display: 'standalone',
        orientation: 'portrait',
        start_url: base,
        scope: base,
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    generateSeoFilesPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
