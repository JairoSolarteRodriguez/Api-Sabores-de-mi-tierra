import { Router } from 'express'
import { getUsers, createUser, activationUser, login, verifyForUpdatePassword, updatePassword } from '../controllers/user.controller.js'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'

const router = Router()


/*==========Users Routes=================*/

router.get('/users', authAdmin, getUsers)
router.post('/register', createUser)
router.post('/login', login)
router.post('/activate', activationUser)
router.post('/change-password', verifyForUpdatePassword)
router.post('/update-password', updatePassword)
router.get('/users/:id')
router.put('/users/:id')
router.delete('/users/:id')



export default router
