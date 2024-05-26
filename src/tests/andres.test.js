import { test, expect } from '@jest/globals'
import { validarDatosUsuario } from '../funciones/validarDatosUsuario.js'

test('Valida que los datos del usuario sean correctos', () => {
  const usuarioValido = {
    nombre: 'Andres',
    apellido: 'Laguilavo',
    correo: 'andres@example.com',
    direccion: 'Calle 123, Ciudad, País',
    contraseña: 'password123'
  }
  expect(() => validarDatosUsuario(usuarioValido)).not.toThrow()
})

test('Valida que los datos del usuario sean incorrectos', () => {
  const usuarioInvalido = {
    nombre: 1,
    apellido: '',
    correo: 'andres',
    direccion: 'Calle 123',
    contraseña: 'pass'
  }
  expect(() => validarDatosUsuario(usuarioInvalido)).toThrow()
})
