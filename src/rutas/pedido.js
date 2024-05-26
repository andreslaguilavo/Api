import { Router } from 'express'
import { PedidoControlador } from '../controlador/pedido.controlador.js'

const router = Router()

router.get('/', PedidoControlador.obtenerPedidos)
router.get('/id/:id', PedidoControlador.obtenerPedidoPorId)
router.post('/registrar', PedidoControlador.registrarPedido)

export default router
