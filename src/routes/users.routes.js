import { Router } from 'express'
import { getUsers, createUser, activationUser, login, verifyForUpdatePassword, updatePassword, deleteUser, disableUser } from '../controllers/user.controller.js'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'
import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

const router = Router()


/*==========Users Routes=================*/

router.get('/users', authAdmin, getUsers)
router.post('/register', createUser)
router.post('/login', login)
router.post('/activate', activationUser)
router.post('/change-password', verifyForUpdatePassword)
router.put('/update-password', updatePassword)
router.delete('/users/:id', authOwnerOrAdmin, deleteUser)
router.patch('/users/disabled/:id', authOwnerOrAdmin, disableUser)


/*==========Profile Routes=================*/



export default router
