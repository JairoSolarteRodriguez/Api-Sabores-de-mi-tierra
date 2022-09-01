import { Router } from 'express'

import { authAdmin } from '../middlewares/authAdmin.js'

import { getAllMeasures, getMeasureById, createMeasure, updateMeasure, deleteAllMeasures, deleteMeasureById } from '../controllers/api/Measure.controller.js'

const router = Router()

/*==========Profile Routes=================*/
router.get('/measure', getAllMeasures)
router.get('/measure/:id', getMeasureById)
router.post('/measure', createMeasure)
router.patch('/measure/:id', authAdmin, updateMeasure)
router.delete('/measure', authAdmin, deleteAllMeasures)
router.delete('/measure/:id', authAdmin, deleteMeasureById)

export default router
