import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'
import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

import { createProfile, getProfileInfo, getAllProfileInfo, updateProfile } from '../controllers/profiles/profile.controller.js'

const router = Router()

/*==========Profile Routes=================*/
router.get('/user-profile', authAdmin, getAllProfileInfo)
router.get('/info/:id', getProfileInfo)
router.post('/profile', createProfile)
router.patch('/update-profile/:id', authOwnerOrAdmin, updateProfile)

export default router
