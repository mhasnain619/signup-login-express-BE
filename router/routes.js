import express from 'express'
import { loginController } from '../controller/loginController.js'
import { signupController } from '../controller/signUoController.js'
import { getAllUserController } from '../controller/getAllUserConntroller.js'
import { tokenVerification } from '../middleware/middleware.js'
const router = express.Router()

router.route('/api/signup').post(signupController)
router.route('/api/login').post(loginController)
router.route('/api/getUsers').get(tokenVerification, getAllUserController)

export default router