import { Router } from 'express'

import { authAdmin } from '../middlewares/authAdmin.js'

import { getAllDificults, getDificultById, createDificult, updateDificult, deleteAllDificults, deleteDificultById } from '../controllers/api/Dificult.controller.js'

const router = Router()

/*==========dificult Routes=================*/
router.get('/dificult', getAllDificults)
router.get('/dificult/:id', getDificultById)
router.post('/dificult', createDificult)
router.patch('/dificult/:id', authAdmin, updateDificult)
router.delete('/dificult', authAdmin, deleteAllDificults)
router.delete('/dificult/:id', authAdmin, deleteDificultById)

export default router
