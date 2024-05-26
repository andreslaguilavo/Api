import { Router } from 'express'
import { CancionControlador } from '../controlador/cancion.controlador.js'
const router = Router()

router.get('/', CancionControlador.buscarCanciones)
router.get('/id/:id', CancionControlador.buscarPorId)
router.post('/registrar', CancionControlador.registrarCancion)
export default router
