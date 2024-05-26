import { validarFormatoCancion } from '../utilidades/validarFormatoCancion.js'
import { CancionModelo } from '../modelo/cancion.modelo.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { cancionSchema } from '../schemas.js'

export class CancionControlador {
  /**
   * Registra una nueva canción en la base de datos.
   *
   * @static
   * @async
   * @param {Object} req - El objeto de solicitud de Express.
   * @param {Object} res - El objeto de respuesta de Express.
   * @param {Object} req.body - El cuerpo de la solicitud, que contiene los datos de la canción.
   * @param {string} req.body.nombre - El nombre de la canción.
   * @param {number} req.body.duracion - La duración de la canción en segundos.
   * @param {string} req.body.artista - El nombre del artista de la canción.
   * @param {number} req.body.generoId - El ID del género de la canción.
   * @param {Object} [req.body.mp3] - Los datos del formato MP3 de la canción, si existe.
   * @param {number} req.body.mp3.tamano - El tamaño del archivo MP3.
   * @param {number} req.body.mp3.duracion - La duración del archivo MP3.
   * @param {string} req.body.mp3.calidad - La calidad del archivo MP3.
   * @param {number} req.body.mp3.precio - El precio del archivo MP3.
   * @param {Object} [req.body.vinilo] - Los datos del formato vinilo de la canción, si existe.
   * @param {string} req.body.vinilo.caratula - La carátula del vinilo.
   * @param {number} req.body.vinilo.stock - El stock del vinilo.
   * @param {number} req.body.vinilo.precio - El precio del vinilo.
   * @returns {Promise<Response>} - Una promesa que se resuelve cuando la canción ha sido registrada.
   */
  static async registrarCancion(req, res) {
    const body = req.body

    try {
      const isValidSchema = validarPropiedadesObjeto(body, cancionSchema)
      if (!isValidSchema.isValid) {
        return res.status(400).json({
          message: 'Datos incorrectos',
          errors: isValidSchema.message
        })
      }
      console.log(body.vinilo)
      const cancion = await CancionModelo.registrarCancion({
        nombre: body.nombre,
        duracion: body.duracion,
        artista: body.artista,
        caratula: body.caratula
      })

      if (body.mp3 !== undefined) {
        console.log(body.mp3)
        await CancionModelo.registrarMp3({
          cancionId: cancion.id,
          tamano: body.mp3.tamano,
          duracion: body.mp3.duracion,
          calidad: body.mp3.calidad,
          precio: body.mp3.precio
        })
      }
      if (body.vinilo !== undefined) {
        await CancionModelo.registrarVinilo({
          cancionId: cancion.id,
          caratula: body.caratula,
          stock: Number(body.vinilo.stock),
          precio: Number(body.vinilo.precio)
        })
      }
      return res.status(200).json({
        message: 'Canción registrada',
        cancion
      })
    } catch (error) {
      console.error(error)
      return res.status(400).json({
        message: 'Error al registrar la canción',
        errors: error.data ?? error
      })
    }
  }

  /**
   * @typedef {Object} Cancion
   * @property {number} id - El ID de la canción.
   * @property {string} nombre - El nombre de la canción.
   * @property {string} artista - El nombre del artista de la canción.
   * @property {number} generoId - El ID del género de la canción.
   * @property {number} duracion - La duración de la canción en segundos.
   * @property {string} caratula - La imagen de la cancion.
   */

  /**
   * @typedef {Object} CancionesResponse
   * @property {Cancion[]} songs - Un array de canciones.
   */

  /**
   * Busca canciones en la base de datos.
   *
   * @static
   * @async
   * @param {Object} req - El objeto de solicitud de Express.
   * @param {Object} res - El objeto de respuesta de Express.
   * @param {Object} req.query - El objeto de consulta, que contiene los parámetros de búsqueda.
   * @param {string} [req.query.q] - El término de búsqueda.
   * @param {string} [req.query.formato] - El formato de las canciones a buscar.
   * @returns {Promise<CancionesResponse>} - Una promesa que se resuelve cuando las canciones han sido buscadas.
   */
  static async buscarCanciones(req, res) {
    const querys = req.query

    querys.q = querys.q || ''

    if (querys.format && !validarFormatoCancion(querys.format)) {
      res.send('Formato no válido')
    }

    try {
      let songs = []
      console.log(querys.format)

      if (querys.format === 'mp3') {
        songs = await CancionModelo.buscarMP3(querys.q)
      } else if (querys.format === 'vinilo') {
        songs = await CancionModelo.buscarVinilos(querys.q)
      } else {
        songs = await CancionModelo.buscarCanciones(querys.q)
      }

      return res.json({
        songs
      })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send(`Error al obtener las canciones : message : ${error?.message}`)
    }
  }

  /**
   * Busca una canción por su ID.
   *
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {Object} req.params - Los parámetros de la ruta.
   * @param {string|number} req.params.id - El ID de la canción a buscar.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Promise<Cancion>} Una promesa que se resuelve cuando se completa la operación.
   * @throws {Error} Si el ID de la canción no es válido o si ocurre un error al buscar la canción.
   */
  static async buscarPorId(req, res) {
    const querys = req.params

    if (!querys.id || isNaN(querys.id)) {
      return res.status(400).json({
        message: 'Falta el ID de la canción'
      })
    }
    const id = Number(querys.id)
    try {
      const songs = await CancionModelo.buscarCancionPorId(id)
      console.log(songs)

      return res.json({
        songs
      })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .send(`Error al obtener las canciones : message : ${error?.message}`)
    }
  }
}
