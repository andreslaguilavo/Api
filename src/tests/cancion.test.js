import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { cancionSchema } from '../schemas.js'
import { describe, expect, it } from '@jest/globals'

describe('validarPropiedadesObjeto', () => {
  it('debería devolver true si el objeto cumple con el esquema de canción con mp3', () => {
    const cancion = {
      nombre: 'Titulo',
      artista: 'Nombre del artista',
      duracion: 180, // Duración en segundos
      caratula: 'https://url-de-la-caratula.com',
      mp3: {
        tamano: '100',
        calidad: '320kbps',
        precio: 10
      }
    }

    const resultado = validarPropiedadesObjeto(cancion, cancionSchema)

    expect(resultado.isValid).toBe(true)
  })

  it('debería devolver false si el objeto no cumple con el esquema de canción', () => {
    const cancion = {
      nombre: 'Titulo'
      // falta el resto de propiedades
    }

    const resultado = validarPropiedadesObjeto(cancion, cancionSchema)

    expect(resultado.isValid).toBe(false)
  })

  it('debería devolver true si el objeto no cumple con el esquema de canción con vinilo', () => {
    const cancion = {
      nombre: 'Titulo',
      artista: 'Nombre del artista',
      duracion: 180, // Duración en segundos
      caratula: 'https://url-de-la-caratula.com',
      vinilo: {
        stock: 10,
        precio: 1000
      }
    }

    const resultado = validarPropiedadesObjeto(cancion, cancionSchema)

    expect(resultado.isValid).toBe(true)
  })
})
