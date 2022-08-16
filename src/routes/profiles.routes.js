import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'
import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

const router = Router()

/*==========Profile Routes=================*/


export default router
