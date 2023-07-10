import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createproductreview } from '../controlers/productControler.js'
import { protect, admin, store } from '../middleware/authMiddleware.js'


router.route('/').get(getProducts).post(protect, admin, store, createProduct)
router.route('/:id/reviews').post(protect, createproductreview)

router.route('/:id').get(getProductById).delete(protect, admin, store, deleteProduct).put(protect, admin, store, updateProduct)



export default router