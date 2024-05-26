import { z } from 'zod'

export const clienteSchema = {
  nombre: z
    .string()
    .min(1, 'El nombre es requerido.')
    .max(50, 'El nombre es demasiado largo.'),
  apellido: z
    .string()
    .min(1, 'El apellido es requerido.')
    .max(50, 'El apellido es demasiado largo.'),
  correo: z.string().email('El correo no es válido.'),
  contrasena: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  direccion: z.optional(
    z
      .string()
      .min(8, 'La dirección debe tener al menos 8 digitos.')
      .max(50, 'La dirección es demasiado larga.')
  ),
  tipoUsuario: z.string()
}

export const authSchema = {
  correo: z.string().email('El correo no es válido.'),
  contrasena: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
}

export const cancionSchema = {
  nombre: z
    .string()
    .min(1, 'El nombre es requerido.')
    .max(50, 'El nombre es demasiado largo.'),
  artista: z
    .string()
    .min(1, 'El artista es requerido.')
    .max(50, 'El artista es demasiado largo.'),
  duracion: z.optional(z.number().min(1, 'La duración debe ser mayor a 0.')),
  caratula: z.string().url('La caratula debe ser una URL válida.'),
  mp3: z.optional(
    z.object({
      tamano: z.string().min(1, 'El tamaño debe ser mayor a 0.'),
      calidad: z.string().min(1, 'La calidad es requerida.'),
      precio: z.number().min(1, 'El precio debe ser mayor a 0.')
    })
  ),
  vinilo: z.optional(
    z.object({
      stock: z.number().min(1, 'El stock debe ser mayor a 0.'),
      precio: z.number().min(1, 'El precio debe ser mayor a 0.')
    })
  )
}
