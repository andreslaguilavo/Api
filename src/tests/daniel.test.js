// import sum from '../funciones/sum'
import { test, expect } from '@jest/globals'
import { validarFormatoCancion } from '../utilidades/validarFormatoCancion.js'

test('Valida que el formato solicitado sea vinilo o mp3', () => {
  expect(validarFormatoCancion('vinilo')).toBe(true)
  expect(validarFormatoCancion('VINILO')).toBe(true)
  expect(validarFormatoCancion('mp3')).toBe(true)
  expect(validarFormatoCancion('MP3')).toBe(true)
  expect(validarFormatoCancion(undefined)).toBe(false)
  expect(validarFormatoCancion()).toBe(false)
  expect(validarFormatoCancion('cualquiercosa')).toBe(false)
  expect(validarFormatoCancion(null)).toBe(false)
  expect(validarFormatoCancion(1234)).toBe(false)
  expect(validarFormatoCancion(new Date())).toBe(false)
})
