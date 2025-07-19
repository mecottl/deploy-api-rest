// import fs from 'node:fs'
// const carts = JSON.parse(fs.readFileSync('./carts.json', 'utf-8'))
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)
