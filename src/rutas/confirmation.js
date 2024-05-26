import { Router } from 'express'
import { prisma } from '../prisma.js'
import { Order } from './order.model.js' // Importa el modelo de la orden

const router = Router()

// Ruta para confirmar o rechazar una orden de pedido por parte del proveedor
router.put('/order/:orderId', async (req, res) => {
  const orderId = req.params.orderId; // Obtener el ID de la orden del parámetro de la ruta
  try {
    const orderData = Order.parse(req.body); // Validar y obtener los datos de la orden actualizados
    // Lógica para confirmar o rechazar la orden de pedido con el ID proporcionado
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: orderData.status, // Actualiza el estado de la orden (confirmada o rechazada)
        // Otras actualizaciones de la orden si es necesario
      },
    });
    res.status(200).json(updatedOrder); // Devuelve la orden actualizada
  } catch (error) {
    res.status(400).send('Error en la validación de datos');
  }
});

export default router
