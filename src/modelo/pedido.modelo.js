import { prisma } from '../prisma.js'

export class PedidoModelo {
  static async registrarPedido({ usuarioId, total }) {
    return await prisma.pedido.create({
      data: {
        usuarioId,
        estado: 'pendiente',
        total
      }
    })
  }

  static async registrarPedidoDetalle({
    pedido,
    cancionId,
    precio,
    cantidad,
    formato
  }) {
    return prisma.pedidoDetalle.create({
      data: {
        pedidoId: pedido,
        cancionId,
        precioSnapshot: precio,
        cantidad,
        formato: formato.toLowerCase()
      }
    })
  }

  static async obtenerPedidos(usuarioId) {
    return await prisma.pedido.findMany({
      where: {
        usuarioId
      },
      include: {
        PedidoDetalle: {
          include: {
            cancion: true
          }
        }
      }
    })
  }

  static async obtenerPedidoPorId(id) {
    return await prisma.pedido.findMany({
      where: {
        id: parseInt(id)
      },
      include: {
        PedidoDetalle: true
      }
    })
  }
}
