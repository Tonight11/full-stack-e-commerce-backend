import Router from "express";
import productController from "./controller/productController.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = new Router()

router.post('/product', authMiddleware(['admin', 'manager']), productController.create)
router.get('/product', productController.getAll)
router.get('/product/:id', productController.getOne)
router.put('/product', authMiddleware(['admin', 'manager']), productController.update)
router.delete('/product/:id', authMiddleware(['admin', 'manager']), productController.delete)

export default router