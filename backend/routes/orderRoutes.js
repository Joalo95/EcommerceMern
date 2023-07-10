import express from 'express'
const router = express.Router()
import { addorderitems, GetMyOrders, getOrderById, GetOrders, updateOrderToPaid, updateOrderToDelivered, GetOrdersByStore } from '../controlers/orderControler.js'
import { protect, admin, store } from '../middleware/authMiddleware.js'


router.route('/').post(protect, addorderitems).get(protect, admin, GetOrders).get(protect, admin, store, GetOrdersByStore)
router.route('/myorders').get(protect, GetMyOrders)

router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

router.route('/:id/deliver').put(protect, admin, store, updateOrderToDelivered)




export default router