import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'

import { createTool, deleteAllTools, deleteToolById, getAllTools, getToolsById, updateTool } from '../controllers/api/Tools.controller.js'

const router = Router()

/*==========Profile Routes=================*/
router.get('/tools', getAllTools)
router.get('/tools/:id', getToolsById)
router.post('/tools', createTool)
router.patch('/tools/:id', updateTool)
router.delete('/tools', deleteAllTools)
router.delete('/tools/:id', deleteToolById)

export default router
