import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { validateCart, validatePartialCart } from '../schemas/carts.js'
import { readJSON } from '../utils/utils.js'
const { carts } = readJSON('../carts.json')
export const cartsRouter = Router()

cartsRouter.get('/', (req, res) => {
  res.json(carts)
})

cartsRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const cart = carts.find(cart => cart.id === id)
  if (cart) return res.json(cart)
  res.status(404).json({ message: 'Not foundxd' })
})

cartsRouter.post('/', (req, res) => {
  const result = validateCart(req.body)

  if (result.error) {
    // 422
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newCart = {
    id: randomUUID(),
    ...result.data
  }
  carts.push(newCart)

  res.status(201).json(newCart)
})

cartsRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const cartIndex = carts.findIndex(cart => cart.id === id)

  if (cartIndex === -1) {
    return res.status(404).json({ message: 'movie not found ' })
  }

  carts.splice(cartIndex, 1)
})

cartsRouter.patch('/:id', (req, res) => {
  const result = validatePartialCart(req.body)
  if (!result.success) {
    return res.status(404).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const cartIndex = carts.findIndex(cart => cart.id === id)

  if (!cartIndex < 0) return res.status(404)

  const updateCart = {
    ...carts[cartIndex],
    ...result.data
  }

  carts[cartIndex] = updateCart
  return res.json(updateCart)
})
