import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'

import { createReport, rejectReport, getActiveReports, deleteAllReports, deleteByIdReports } from '../controllers/reports/report.controller.js'

const router = Router()

/*==========Reports user Routes=================*/
router.get('/report/:id', authAdmin, getActiveReports)
router.post('/report', createReport)
router.put('/report/:id', authAdmin, rejectReport)
router.delete('/report/', authAdmin, deleteAllReports)
router.delete('/report/:id', authAdmin, deleteByIdReports)


export default router
