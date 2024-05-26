import { z } from 'zod'
import { CarritoComprasModelo } from '../modelo/carritoCompras.modelo.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { formatoCancion } from '../constantes/const.js'

export class CarrtitoComprasControlador {
  /**
   * @typedef {Object} LimpiarCarritoQuery
   * @property {string} carritoId - El ID del carrito de compras a limpiar.
   */

  /**
   * Limpia el carrito de compras.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {LimpiarCarritoQuery} req.query - La consulta de la solicitud.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static async limpiarCarrito(req, res) {
    try {
      const carritoId = req.query.carritoId

      await CarritoComprasModelo.limpiarCarrito(carritoId)
      res.status(200).json({ message: 'Carrito limpiado' })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message: 'Error al limpiar el carrito',
        errors: error
      })
    }
  }

  /**
   * @typedef {Object} EliminarItemBody
   * @property {string} carritoId - El ID del carrito de compras.
   * @property {string} itemId - El ID del item a eliminar.
   * @property {string} formato - El formato del item a eliminar.
   */
  /**
   * Elimina un item del carrito de compras.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {EliminarItemBody} req.body - El cuerpo de la solicitud.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static async eliminarItem(req, res) {
    try {
      const body = req.body
      await CarritoComprasModelo.eliminarItem(
        body.carritoId,
        body.itemId,
        body.formato
      )
      res.status(200).json({ message: 'Item eliminado' })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message: 'Error al eliminar el item',
        errors: error
      })
    }
  }

  /**
   * @typedef {Object} AgregarCancionBody
   * @property {number} usuarioId - El ID del usuario.
   * @property {number} cancionId - El ID de la canción a agregar.
   * @property {number} [cantidad] - La cantidad de la canción a agregar.
   * @property {string} formato - El formato de la canción a agregar.
   * @property {number} precio - El precio de la canción a agregar.
   */
  /**
   * Agrega una canción al carrito de compras.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {AgregarCancionBody} req.body - El cuerpo de la solicitud.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static async agregarCancion(req, res) {
    try {
      const body = req.body
      const schema = {
        usuarioId: z.number().positive(),
        cancionId: z.number().positive(),
        cantidad: z.optional(z.number().positive()),
        formato: formatoCancion,
        precio: z.number().positive()
      }
      const isValidSchema = validarPropiedadesObjeto(body, schema)
      if (!isValidSchema.isValid) {
        return res.status(400).json({
          message: 'Error al agregar la canción al carrito',
          errors: isValidSchema.message
        })
      }
      let carrito = await CarritoComprasModelo.buscarCarritoId(body.usuarioId)
      console.log(carrito)

      if (!carrito) {
        carrito = await CarritoComprasModelo.crearCarrito(body.usuarioId)
      }

      await CarritoComprasModelo.upsertCarrito(
        carrito.id,
        body.cancionId,
        body.formato,
        body.cantidad,
        body.precio
      )
      res.status(200).json({ message: 'Canción agregada al carrito' })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message: 'Error al agregar la canción al carrito',
        errors: error
      })
    }
  }

  /**
   * Obtiene el carrito de compras de un usuario.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {ObtenerCarritoQuery} req.query - La consulta de la solicitud.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<Carrito>} Una promesa que se resuelve en el carrito de compras del usuario.
   * @throws {Error} Lanza un error si ocurre un problema al obtener el carrito de compras.
   */
  static async obtenerCarrito(req, res) {
    try {
      const usuarioId = req.query.usuarioId

      const carrito = await CarritoComprasModelo.buscarCarrito(
        Number(usuarioId)
      )
      console.log(carrito)
      res.status(200).json({ message: 'Carrito de compras', carrito })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message: 'Error al obtener el carrito de compras',
        errors: error
      })
    }
  }
}
