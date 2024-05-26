import { Router } from 'express'
import { CarrtitoComprasControlador } from '../controlador/carritoCompras.controlador.js'

const router = Router()

router.get('/', CarrtitoComprasControlador.obtenerCarrito)
router.post('/agregar', CarrtitoComprasControlador.agregarCancion)
router.delete('/', CarrtitoComprasControlador.limpiarCarrito)
router.delete('/id', CarrtitoComprasControlador.eliminarItem)

export default router
