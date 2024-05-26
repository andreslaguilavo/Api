import { prisma } from '../prisma.js'

export class CancionModelo {
  static async registrarCancion({ nombre, duracion, artista, caratula }) {
    return await prisma.cancion.create({
      data: {
        nombre,
        artista,
        duracion,
        caratula
      }
    })
  }

  static async registrarMp3({ cancionId, tamano, duracion, calidad, precio }) {
    return await prisma.mP3.create({
      data: {
        cancionId,
        tamano,
        calidad,
        precio
      }
    })
  }

  static async registrarVinilo({ cancionId, stock, precio }) {
    return await prisma.vinilo.create({
      data: {
        cancionId,
        stock,
        precio
      }
    })
  }

  static async buscarCanciones(query = '') {
    return await prisma.cancion.findMany({
      where: {
        OR: [
          {
            nombre: {
              contains: query,
              mode: 'insensitive' // Indiferente ante mayúsculas y minúsculas
            }
          }
        ]
      }
    })
  }

  static async buscarVinilos(query = '') {
    const q = `%${query.toLowerCase()}%`

    return await prisma.$queryRaw`
      SELECT * 
      FROM "Cancion"
      INNER JOIN "Vinilo" ON "Cancion".id = "Vinilo"."cancionId"
      WHERE LOWER("Cancion".nombre) LIKE ${q}
    `
  }

  static async buscarMP3(query = '') {
    const q = `%${query.toLowerCase()}%`

    return await prisma.$queryRaw`
      SELECT * 
      FROM "Cancion"
      INNER JOIN "MP3" ON "Cancion".id = "MP3"."cancionId"
      WHERE LOWER("Cancion".nombre) LIKE ${q}
    `
  }

  static async buscarCancionPorId(id) {
    return await prisma.cancion.findUnique({
      where: {
        id
      },
      include: {
        MP3: true,
        Vinilo: true
      }
    })
  }

  static async actualizarStock({ cancionId, cantidadComprada }) {
    return await prisma.vinilo.update({
      where: {
        cancionId
      },
      data: {
        stock: {
          decrement: cantidadComprada
        }
      }
    })
  }
}
