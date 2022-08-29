import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'

import { createIngredient, deleteAllIngredient, deleteIngredientById, getAllIngredients, getIngredientById, updateIngredient } from '../controllers/api/Ingredients.controller.js'

const router = Router()

/*==========Profile Routes=================*/
router.get('/ingredients', getAllIngredients)
router.get('/ingredients/:id', getIngredientById)
router.post('/ingredients', createIngredient)
router.patch('/ingredients/:id', authAdmin, updateIngredient)
router.delete('/ingredients', authAdmin, deleteAllIngredient)
router.delete('/ingredients/:id', authAdmin, deleteIngredientById)

export default router
