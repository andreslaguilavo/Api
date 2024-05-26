import bcrypt from 'bcrypt'

export const validarContraseña = async (contrasena, contrasenaEncriptada) => {
  return bcrypt.compare(contrasena, contrasenaEncriptada)
}
