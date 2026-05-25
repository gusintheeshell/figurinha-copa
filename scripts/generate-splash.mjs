import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const splashDir = path.join(rootDir, 'public', 'splash')
const iconPath = path.join(rootDir, 'public', 'pwa-512.png')
const background = '#282828'

const splashSizes = [
  { file: 'apple-1290x2796.png', width: 1290, height: 2796 },
  { file: 'apple-1170x2532.png', width: 1170, height: 2532 },
  { file: 'apple-1284x2778.png', width: 1284, height: 2778 },
  { file: 'apple-750x1334.png', width: 750, height: 1334 },
]

await mkdir(splashDir, { recursive: true })

for (const size of splashSizes) {
  const iconSize = Math.round(Math.min(size.width, size.height) * 0.34)
  const icon = await sharp(iconPath).resize(iconSize, iconSize).png().toBuffer()

  await sharp({
    create: {
      width: size.width,
      height: size.height,
      channels: 3,
      background,
    },
  })
    .composite([{ input: icon, gravity: 'center' }])
    .png()
    .toFile(path.join(splashDir, size.file))

  console.log(`Generated ${size.file}`)
}
