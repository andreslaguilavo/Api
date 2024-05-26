import z from 'zod'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { formatoCancion } from '../constantes/const.js'
import { PedidoModelo } from '../modelo/pedido.modelo.js'
import { CarritoComprasModelo } from '../modelo/carritoCompras.modelo.js'

export class PedidoControlador {
  /**
   * @typedef {Object} ItemPedido
   * @property {number} cancionId - El ID de la canción.
   * @property {number} precio - El precio de la canción.
   * @property {number} cantidad - La cantidad de la canción.
   * @property {string} formato - El formato de la canción.
   */
  /**
   * @typedef {Object} RegistrarPedidoBody
   * @property {number} usuarioId - El ID del usuario que realiza el pedido.
   * @property {number} carritoId - El ID del carrito de compras.
   * @property {Array<ItemPedido>} items - Los items del pedido.
   */
  /**
   * Registra un nuevo pedido.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {RegistrarPedidoBody} req.body - El cuerpo de la solicitud, que contiene la información del pedido.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<void>} Una promesa que se resuelve cuando se ha completado el registro del pedido.
   * @throws {Error} Lanza un error si ocurre un problema al registrar el pedido.
   */
  static async registrarPedido(req, res) {
    const body = req.body

    const schema = {
      usuarioId: z.number().positive(),
      carritoId: z.number().positive(),
      items: z.array(
        z.object({
          cancionId: z.number().positive(),
          precio: z.number(),
          cantidad: z.number().positive(),
          formato: formatoCancion
        })
      )
    }

    try {
      console.log(body)

      if (!validarPropiedadesObjeto(body, schema).isValid) {
        return res.status(400).json({
          message: 'Datos incorrectos',
          errors: validarPropiedadesObjeto(body, schema).message
        })
      }

      const total = body.items.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      )

      const pedido = await PedidoModelo.registrarPedido({
        total,
        usuarioId: body.usuarioId
      })

      for (const item of body.items) {
        await PedidoModelo.registrarPedidoDetalle({
          cancionId: item.cancionId,
          pedido: pedido.id,
          precio: item.precio,
          cantidad: item.cantidad,
          formato: item.formato
        })
      }

      await CarritoComprasModelo.limpiarCarrito(body.carritoId)

      res.status(200).json({ message: 'Pedido creado exitosamente' })
    } catch (error) {
      console.error(error)
      res.status(400).json({
        message: 'Error al agregar la canción al carrito',
        errors: error.data ?? error
      })
    }
  }

  /**
   * @typedef {Object} Pedido
   * @property {number} id - El ID del pedido.
   * @property {number} usuarioId - El ID del usuario que realiza el pedido.
   * @property {string} estado - El estado del pedido.
   * @property {number} total - El total del pedido.
   * @property {Array<PedidoDetalle>} detalles - Los detalles del pedido.
   */

  /**
   * @typedef {Object} PedidoDetalle
   * @property {number} pedidoId - El ID del pedido.
   * @property {number} cancionId - El ID de la canción.
   * @property {number} precioSnapshot - El precio de la canción en el momento del pedido.
   * @property {number} cantidad - La cantidad de la canción.
   * @property {string} formato - El formato de la canción.
   */

  /**
   * Obtiene todos los pedidos de un usuario específico.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {Object} req.query - El objeto de consulta HTTP, que contiene el ID del usuario.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<Pedido>} Una promesa que se resuelve cuando se han obtenido todos los pedidos del usuario.
   * @throws {Error} Lanza un error si ocurre un problema al obtener los pedidos.
   */
  static async obtenerPedidos(req, res) {
    const query = req.query
    const usuarioId = query.usuarioId ?? null
    console.log(usuarioId)

    try {
      const pedidos = await PedidoModelo.obtenerPedidos(Number(usuarioId))

      res.status(200).json(pedidos)
    } catch (error) {
      console.error(error)
      res.status(400).json({
        message: 'Error al obtener los pedidos',
        errors: error.data ?? error
      })
    }
  }
  /**
   * Obtiene un pedido específico por su ID.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {Object} req.params - El objeto de parámetros HTTP, que contiene el ID del pedido.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<Pedido>} Una promesa que se resuelve cuando se ha obtenido el pedido.
   * @throws {Error} Lanza un error si ocurre un problema al obtener el pedido.
   */

  static async obtenerPedidoPorId(req, res) {
    const { id } = req.params
    try {
      const pedido = await PedidoModelo.obtenerPedidoPorId(id)

      res.status(200).json(pedido)
    } catch (error) {
      console.error(error)
      res.status(400).json({
        message: 'Error al obtener el pedido',
        errors: error.data ?? error
      })
    }
  }
}
