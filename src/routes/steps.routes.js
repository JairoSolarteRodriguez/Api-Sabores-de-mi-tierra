import { Router } from 'express'

import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

import { createStep, getStepById, updateStepDescription, updateStepImage, deleteStepById } from '../controllers/steps/step.controller.js'

const router = Router()

/*==========Steps Routes=================*/
// router.get('/step', )
router.get('/step/:id', getStepById)
router.post('/step', createStep)
router.patch('/step/description/:id', authOwnerOrAdmin, updateStepDescription)
router.patch('/step/image/:id', authOwnerOrAdmin, updateStepImage)
router.delete('/step/:id', authOwnerOrAdmin, deleteStepById)

export default router
