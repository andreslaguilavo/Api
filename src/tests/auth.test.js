import { validarContraseña } from '../funciones/validarContraseña.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { authSchema } from '../schemas.js'
import { describe, expect, it } from '@jest/globals'
import bcrypt from 'bcrypt'

describe('validarPropiedadesObjeto', () => {
  it('debería devolver true si el objeto cumple con el esquema', () => {
    const objeto = {
      correo: 'correo@valido.com',
      contrasena: 'contrasenaValida'
    }

    const resultado = validarPropiedadesObjeto(objeto, authSchema)

    expect(resultado.isValid).toBe(true)
  })

  it('debería devolver false si el objeto no cumple con el esquema', () => {
    const objeto = {
      correo: 'correo@valido.com'
      // falta la propiedad 'contrasena'
    }
    const resultado = validarPropiedadesObjeto(objeto, authSchema)

    expect(resultado.isValid).toBe(false)
  })
})

describe('validarContraseña', () => {
  it('debería devolver true si la contraseña es válida', async () => {
    const contrasena = 'contrasenaValida'
    const contrasenaHash = await bcrypt.hash(contrasena, 10) // Asume que estás usando bcrypt para el hash

    const resultado = await validarContraseña(contrasena, contrasenaHash)

    expect(resultado).toBe(true)
  })

  it('debería devolver false si la contraseña es inválida', async () => {
    const contrasena = 'contrasenaInvalida'
    const contrasenaHash = await bcrypt.hash('contrasenaValida', 10) // Asume que estás usando bcrypt para el hash

    const resultado = await validarContraseña(contrasena, contrasenaHash)

    expect(resultado).toBe(false)
  })
})
