import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routerCancion from './rutas/cancion.js'
import routerCarritoCompras from './rutas/carritoCompras.js'
import routerPedido from './rutas/pedido.js'
import routerCliente from './rutas/cliente.js'
import routerAuth from './rutas/auth.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
// const __dirname = dirname(
//   fileURLToPath(new URL('../../frontend', import.meta.url))
// )
app.use(express.json())
app.use(cors())

// app.use(express.static(path.join(__dirname, './frontend/dist')))

app.use('/api/auth', routerAuth)
app.use('/api/cliente', routerCliente)
app.use('/api/cancion', routerCancion)
app.use('/api/carrito-compras', routerCarritoCompras)
app.use('/api/pedidos', routerPedido)

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
// })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
