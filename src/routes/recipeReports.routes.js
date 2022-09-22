import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'

import { createReport, rejectReport, getActiveReports, deleteAllReports, deleteByIdReports } from '../controllers/reports/recipeReport.controller.js'

const router = Router()

/*==========Reports user Routes=================*/
router.get('/report-recipe/:id', authAdmin, getActiveReports)
router.post('/report-recipe', createReport)
router.put('/report-recipe/:id', authAdmin, rejectReport)
router.delete('/report-recipe/', authAdmin, deleteAllReports)
router.delete('/report-recipe/:id', authAdmin, deleteByIdReports)


export default router
