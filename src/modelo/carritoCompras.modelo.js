import { prisma } from '../prisma.js'

export class CarritoComprasModelo {
  static async buscarCarritoId(usuarioId) {
    return await prisma.carrito.findFirst({
      where: {
        usuarioId
      }
    })
  }

  static async buscarCarrito(usuarioId) {
    if (!usuarioId || isNaN(usuarioId)) {
      throw new Error('El usuarioId es requerido')
    }
    return await prisma.$queryRaw`SELECT 
    "Carrito".id AS CarritoId,
    "Cancion".*,
    "CarritoDetalle".formato,
    "CarritoDetalle".cantidad,
    "CarritoDetalle".precio
   FROM "Carrito" 
  INNER JOIN "CarritoDetalle" ON "CarritoDetalle"."carritoId" = "Carrito".id
  INNER JOIN "Cancion" ON "CarritoDetalle"."cancionId" = "Cancion"."id"
  WHERE "Carrito"."usuarioId" = ${usuarioId}`
  }

  static async crearCarrito(usuarioId) {
    return await prisma.carrito.create({
      data: {
        usuarioId
      }
    })
  }

  static async upsertCarrito(carritoId, cancionId, formato, cantidad, precio) {
    return await prisma.carritoDetalle.upsert({
      where: {
        carritoId_cancionId_formato: {
          carritoId,
          cancionId,
          formato
        }
      },
      update: {
        cantidad
      },
      create: {
        carritoId,
        cancionId,
        cantidad,
        formato,
        precio
      }
    })
  }

  static async limpiarCarrito(carritoId) {
    return await prisma.carritoDetalle.deleteMany({
      where: {
        carritoId
      }
    })
  }

  static async eliminarItem(carritoId, itemId, formato) {
    return await prisma.carritoDetalle.delete({
      where: {
        carritoId_cancionId_formato: {
          carritoId,
          cancionId: itemId,
          formato
        }
      }
    })
  }
}
