import { validarContraseña } from '../funciones/validarContraseña.js'
import { ClienteModelo } from '../modelo/cliente.modelo.js'
import { authSchema } from '../schemas.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import jwt from 'jsonwebtoken'

export class AuthControlador {
  /**
   * @typedef {Object} TokenResponse
   * @property {string} token - El token JWT generado.
   */

  /**
   * Valida las credenciales del usuario y genera un token JWT si las credenciales son válidas.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {Object} req.body - El cuerpo de la solicitud, que debe contener las credenciales del usuario.
   * @param {string} req.body.correo - El correo electrónico del usuario.
   * @param {string} req.body.contrasena - La contraseña del usuario.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<TokenResponse>} Una promesa que se resuelve cuando se ha completado el procesamiento de la solicitud.
   * @throws {Error} Lanza un error si las credenciales del usuario son inválidas.
   */
  static async validarUsuario(req, res) {
    const body = req.body
    try {
      const isValidSchema = validarPropiedadesObjeto(body, authSchema)
      console.log(isValidSchema)
      if (!isValidSchema.isValid) {
        return res.status(400).json({ mensaje: isValidSchema })
      }

      const cliente = await ClienteModelo.obtenerCliente(body.correo)
      console.log(cliente)
      const { contrasena } = body
      console.log(contrasena, cliente.contrasena)
      const isValidPassword = await validarContraseña(
        contrasena,
        cliente.contrasena
      )

      if (!isValidPassword) {
        throw new Error()
      }

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          cliente
        },
        process.env.JWT_KEY
      )

      res.status(200).json({ token })
    } catch (error) {
      res.status(400).send('Correo o contraseña incorrectos')
    }
  }
}
