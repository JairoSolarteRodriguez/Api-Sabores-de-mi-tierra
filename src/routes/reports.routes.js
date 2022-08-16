import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'

import { createReport, rejectReport, getActiveReports } from '../controllers/reports/report.controller.js'

const router = Router()

/*==========Reports Routes=================*/
router.get('/report/:id', authAdmin, getActiveReports)
router.post('/report', createReport)
router.put('/report/:id', authAdmin, rejectReport)
router.delete('/report/:id', authAdmin)


export default router
