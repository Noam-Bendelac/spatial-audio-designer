

// add assets to public/assets and list their urls here under `/assets`
// (the public folder gets turned into the site's base directory)

interface Asset {
  name: string
  url: string
}

const Asset = (name: string, url: string): Asset => ({ name, url })

export const models3D = [
  Asset('fox', '/assets/3D-models/fox/low-poly-fox-by-pixelmannen.obj'),
]

export const scenes = []

export const audioFiles = []

