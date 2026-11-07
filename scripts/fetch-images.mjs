import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('../public/images/', import.meta.url))
const sourceRoot = 'https://wisatajogjaku.com/wp-content/uploads/2023'

const groups = [
  {
    folder: 'brand',
    sizes: [512, 1024],
    quality: 90,
    images: [
      ['logo-primary', '07/LOGO-PRIMER-1024x346.png'],
      ['logo-secondary', '07/LOGO-SEKUNDER-1024x346.png'],
    ],
  },
  {
    folder: 'photography',
    sizes: [768, 1280, 1920],
    quality: 80,
    images: [
      ['jogja-landscape', '07/aviv-rachmadian-Gepr5w1a9Ac-unsplash-scaled.jpg'],
      ['destination-01', '07/agto-nugroho-NYMRvWePmn8-unsplash-scaled.jpg'],
      ['destination-02', '07/martin-baktiar-adi-setiawan-l8O8_9ur9hc-unsplash-scaled.jpg'],
      ['destination-03', '07/nr-vellarine-pjP2R9oO5IQ-unsplash-scaled.jpg'],
      ['journey-01', '07/20220702_121920-scaled.jpg'],
      ['journey-02', '07/20220702_130928-scaled.jpg'],
      ['journey-03', '07/20220720_092551-scaled.jpg'],
      ['journey-04', '07/20220720_093551-scaled.jpg'],
      ['journey-05', '07/20230211_151914-scaled.jpg'],
      ['journey-06', '07/20230211_152009-scaled.jpg'],
      ['journey-07', '07/20230211_191316-scaled.jpg'],
      ['journey-08', '07/20230211_195629-scaled.jpg'],
      ['journey-09', '07/20230227_071420-scaled.jpg'],
      ['journey-10', '07/20230629_120739-scaled.jpg'],
      ['journey-11', '07/20230708_121656-scaled.jpg'],
      ['journey-12', '07/20230710_094157-scaled.jpg'],
      ['journey-13', '07/20230710_130412-scaled.jpg'],
      ['journey-14', '07/20230710_171127-scaled.jpg'],
      ['journey-15', '07/20230710_181028-scaled.jpg'],
      ['journey-16', '07/20230710_181149-scaled.jpg'],
    ],
  },
  {
    folder: 'packages',
    sizes: [640, 1024],
    quality: 88,
    images: [
      ...Array.from({ length: 8 }, (_, index) => [`a-0${index + 1}`, `07/${index + 2}.png`]),
      ['a-09', '12/tour-package-day-1-09.png'],
      ['b-01', '07/12.png'],
      ['b-02', '07/13.png'],
      ['b-03', '07/14.png'],
      ['c-01', '07/16.png'],
      ['c-02', '07/17.png'],
      ['one-day', '07/1.png'],
      ['two-day', '07/11.png'],
      ['three-day', '07/15.png'],
    ],
  },
  {
    folder: 'vehicles',
    sizes: [480, 900],
    quality: 86,
    images: [
      ['calya', '07/calya-jadi.png'],
      ['avanza-facelift', '07/Avanzafacelift-1-1.png'],
      ['all-new-avanza', '07/all-new-avanza-silver-1-e1690777645686.png'],
      ['innova-reborn', '07/inova.png'],
      ['hiace-commuter', '07/hiace_commuter_1-removebg-preview.png'],
      ['hiace-premio', '07/haice-premio.png'],
      ['elf-giga', '07/elf_giga_21-removebg-preview.png'],
      ['fortuner', '07/fortuner_1-removebg-preview.png'],
      ['alphard', '07/ALPRAT.png'],
    ],
  },
]

const queue = []
const failures = []

for (const group of groups) {
  const outputFolder = path.join(root, group.folder)
  await mkdir(outputFolder, { recursive: true })

  for (const [name, sourcePath] of group.images) {
    queue.push(async () => {
      const response = await fetch(`${sourceRoot}/${sourcePath}`)
      if (!response.ok) throw new Error(`${response.status} ${sourcePath}`)
      const input = Buffer.from(await response.arrayBuffer())

      for (const width of group.sizes) {
        const output = path.join(outputFolder, `${name}-${width}.webp`)
        await sharp(input)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: group.quality })
          .toFile(output)
      }
      console.log(`Optimized ${group.folder}/${name}`)
    })
  }
}

const worker = async () => {
  while (queue.length) {
    const task = queue.shift()
    try {
      await task()
    } catch (error) {
      failures.push(error.message)
    }
  }
}

await Promise.all(Array.from({ length: 4 }, worker))

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
}
