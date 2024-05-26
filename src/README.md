# Creación de un Endpoint en el Proyecto
1. Crear el modelo: Primero, crea un modelo que haga uso de la prisma (ORM encargado de la comunicacion con la base de datos).

```javascript
// usuario.modelo.js
import { prisma } from '../prisma.js'

export class UsuarioModelo {
  static async crearUsuario(datosUsuario) {
    return await prisma.usuario.create({
      data: datosUsuario,
    })
  }
}
```

2. Crear el controlador: Segundo, necesitas crear un controlador para tu endpoint. Los controladores se encuentran en la carpeta controlador. Por ejemplo, si estás creando un endpoint para gestionar usuarios, podrías crear un archivo llamado usuario.controlador.js.

```javascript
// usuario.controlador.js
export const UsuarioControlador = {
  crearUsuario: async (req, res) => {
    // Lógica para crear un usuario
  },
  // Otros métodos del controlador
};

```

3. Crear el archivo de rutas: Luego, necesitas crear un archivo de rutas para tu endpoint en la carpeta rutas. Este archivo debería importar tu controlador y definir las rutas para tu endpoint.

```javascript
// usuario.js
import { Router } from 'express'
import { UsuarioControlador } from '../controlador/usuario.controlador.js'

const router = Router()

router.post('/crear', UsuarioControlador.crearUsuario)

export default router
```

4. Agregar la ruta al archivo principal: Finalmente, necesitas agregar tu ruta al archivo principal index.js. Importa tu archivo de rutas y usa app.use() para agregarlo a tu aplicación Express.

```javascript

// index.js
import express from 'express'
import routerUsuario from './rutas/usuario.js'
// Otros imports

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use('/usuario', routerUsuario) // se agrega la ruta usuario
// Otras rutas

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
```

Recuerda que este es un ejemplo básico y que la lógica de tu controlador dependerá de lo que necesites hacer en tu endpoint.


