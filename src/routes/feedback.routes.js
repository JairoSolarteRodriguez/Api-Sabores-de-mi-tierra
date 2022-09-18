import { Router } from 'express'

// Middlewares
import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

import { getFeedback, addFeedback, getFeedbackById, deleteFeedbackById, updateFeedback } from '../controllers/appFeedback/appfeedback.controller.js'

const router = Router()

/*========== Feedbacks Routes=================*/
router.get('/feedback', getFeedback)
router.get('/feedback/:id', getFeedbackById)
router.post('/feedback', addFeedback)
router.delete('/feedback/:id', authOwnerOrAdmin, deleteFeedbackById)
router.patch('/feedback/:id', authOwnerOrAdmin, updateFeedback)

export default router
