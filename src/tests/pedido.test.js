import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { z } from 'zod'
import { describe, expect, it } from '@jest/globals'
import { formatoCancion } from '../constantes/const.js'

const schema = {
  usuarioId: z.number().positive(),
  cancionId: z.number().positive(),
  precioSnapshot: z.number().positive(),
  cantidad: z.number().positive(),
  formato: formatoCancion
}
describe('validarPropiedadesObjeto', () => {
  it('debería devolver true si el objeto cumple con el esquema de pedido', () => {
    const pedido = {
      usuarioId: 1,
      cancionId: 1,
      precioSnapshot: 10.0,
      cantidad: 1,
      formato: 'mp3'
    }

    const resultado = validarPropiedadesObjeto(pedido, schema)

    expect(resultado.isValid).toBe(true)
  })

  it('debería devolver false si el objeto no cumple con el esquema de pedido', () => {
    const pedido = {
      usuarioId: 1
      // falta el resto de propiedades
    }

    const resultado = validarPropiedadesObjeto(pedido, schema)

    expect(resultado.isValid).toBe(false)
  })
})
