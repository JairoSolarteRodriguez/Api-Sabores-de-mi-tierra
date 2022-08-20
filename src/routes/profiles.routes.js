import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'
import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

import { createProfile, getProfileInfo } from '../controllers/profiles/profile.controller.js'

const router = Router()

/*==========Profile Routes=================*/
router.get('/user-profile', authAdmin)
router.get('/profile/:id')
router.get('/info/:id', authOwnerOrAdmin, getProfileInfo)
router.get('/userprofile/:id')
router.post('/profile', createProfile)

export default router
