import { z } from 'zod'

const userSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellido: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  correo: z.string().email('El correo electrónico no es válido'),
  direccion: z
    .string()
    .min(10, 'La dirección debe tener al menos 10 caracteres'),
  contraseña: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
})

// Función para validar los datos del usuario
export function validarDatosUsuario(data) {
  try {
    const validatedData = userSchema.parse(data)
    return validatedData
  } catch (error) {
    throw new Error(error.message)
  }
}
