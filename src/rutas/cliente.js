import { Router } from 'express'
import { ClienteControlador } from '../controlador/cliente.controlador.js'

const router = Router()

router.post('/crear', ClienteControlador.crearCliente)

export default router
