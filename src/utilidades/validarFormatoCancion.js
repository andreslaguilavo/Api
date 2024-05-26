import { z } from 'zod'

export function validarFormatoCancion(format) {
  if (typeof format !== 'string') {
    return false
  }
  const formatSchema = z.union([z.literal('vinilo'), z.literal('mp3')])

  const result = formatSchema.safeParse(format?.toLowerCase())

  return result.success
}
