import Router from "express";
import AuthController from "./controller/authController.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = new Router()

router.post('/register', authMiddleware(['admin']),AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh', AuthController.refresh)

export default router