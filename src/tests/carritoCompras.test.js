import { formatoCancion } from '../constantes/const.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { z } from 'zod'
import { describe, expect, it } from '@jest/globals'

const schema = {
  usuarioId: z.number().positive(),
  cancionId: z.number().positive(),
  cantidad: z.optional(z.number().positive()),
  formato: formatoCancion,
  precio: z.number().positive()
}

describe('validarPropiedadesObjeto', () => {
  it('debería devolver true si el objeto cumple con el esquema de carrito de compras', () => {
    const carrito = {
      usuarioId: 1,
      cancionId: 1,
      cantidad: 1,
      formato: 'mp3',
      precio: 10.0
    }

    const resultado = validarPropiedadesObjeto(carrito, schema)

    expect(resultado.isValid).toBe(true)
  })

  it('debería devolver false si el objeto no cumple con el esquema de carrito de compras', () => {
    const carrito = {
      usuarioId: 1
      // falta la mayoria de propiedades
    }

    const resultado = validarPropiedadesObjeto(carrito, schema)

    expect(resultado.isValid).toBe(false)
  })
})
