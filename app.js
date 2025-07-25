import express, { json } from 'express'
import { cartsRouter } from './routes/carts.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/carts', cartsRouter)
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
