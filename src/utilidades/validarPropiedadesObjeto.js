import { z } from 'zod'

export const validarPropiedadesObjeto = (data, schema) => {
  const objectSchema = z.object(schema)
  try {
    const validatedData = objectSchema.parse(data)
    return {
      isValid: true,
      message: validatedData
    }
  } catch (error) {
    const messages = error?.errors?.map((error) => {
      return {
        value: error.path[0],
        message: error.message
      }
    })
    return {
      isValid: false,
      message: messages
    }
  }
}
