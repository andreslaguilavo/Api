import { Router } from 'express'
import { AuthControlador } from '../controlador/auth.controlador.js'

const router = Router()

router.post('/login', AuthControlador.validarUsuario)
export default router
