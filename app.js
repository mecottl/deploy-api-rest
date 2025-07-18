const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')
const { validateCart, validatePartialCart } = require('./schemas/carts')

const data = require('./carts.json')
const carts = data.carts

const app = express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

app.get('/cart', (req, res) => {
  res.json(carts)
})

app.get('/cart/:id', (req, res) => {
  const { id } = req.params
  const cart = carts.find(cart => cart.id === id)
  if (cart) return res.json(cart)
  res.status(404).json({ message: 'Not foundxd' })
})

app.get('/carts', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  const { total } = req.query
  if (total) {
    const filteredCart = carts.filter(
      cart => String(cart.total).toLowerCase() === total.toLowerCase())
    return res.json(filteredCart)
  }
  res.json(carts)
})

app.post('/carts', (req, res) => {
  const result = validateCart(req.body)

  if (result.error) {
    // 422
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newCart = {
    id: crypto.randomUUID(),
    ...result.data
  }
  carts.push(newCart)

  res.status(201).json(newCart)
})

app.patch('/carts/:id', (req, res) => {
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

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
