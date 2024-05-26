import { ClienteModelo } from '../modelo/cliente.modelo.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { clienteSchema } from '../schemas.js'
import bcrypt from 'bcrypt'

export class ClienteControlador {
  /**
   * @typedef {Object} CrearClienteBody
   * @property {string} nombre - El nombre del cliente.
   * @property {string} apellido - El apellido del cliente.
   * @property {string} correo - El correo electrónico del cliente.
   * @property {string} contrasena - La contraseña del cliente.
   * @property {string} [telefono] - El número de teléfono del cliente. Es opcional.
   * @property {string} [direccion] - La dirección del cliente. Es opcional.
   */

  /**
   * Crea un nuevo cliente.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {CrearClienteBody} req.body - El cuerpo de la solicitud, que contiene la información del nuevo cliente.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<Cliente>} Una promesa que se resuelve cuando se ha completado la creación del cliente.
   * @throws {Error} Lanza un error si ocurre un problema al crear el cliente.
   */
  static async crearCliente(req, res) {
    const body = req.body

    try {
      const isValidSchema = validarPropiedadesObjeto(body, clienteSchema)

      if (!isValidSchema.isValid) {
        return res.status(400).json({
          message: 'Error al crear el cliente',
          errors: isValidSchema.message
        })
      }

      const contrasenaEncriptada = await bcrypt.hash(body.contrasena, 8)

      const cliente = await ClienteModelo.crearCliente({
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.correo,
        contrasena: contrasenaEncriptada,
        direccion: body.direccion,
        tipoUsuario: body.tipoUsuario
      })

      res.json({
        cliente
      })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send(`Error al crear el cliente : message : ${error?.message}`)
    }
  }
}
