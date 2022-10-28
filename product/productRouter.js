import Router from "express";
import productController from "./controller/productController.js";
import authMiddleware from "../middleware/auth-middleware.js";
import paginatedResults from '../middleware/limit-middleware.js'
import Product from "./modules/Product.js";

const router = new Router()

router.post('/product', authMiddleware(['admin', 'manager']), productController.create)
router.get('/product', paginatedResults(Product), productController.getAll)
router.get('/product/:id', productController.getOne)
router.get('/admin-product', authMiddleware(['admin', 'manager']), paginatedResults(Product), productController.getAll)
router.put('/product', authMiddleware(['admin', 'manager']), productController.update)
router.delete('/product/:id', authMiddleware(['admin', 'manager']), productController.delete)

export default router