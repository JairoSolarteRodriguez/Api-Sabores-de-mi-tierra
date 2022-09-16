import { Router } from 'express'

// Middlewares
import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

import { createIngredient, deleteAllIngredient, deleteIngredientById, getAllIngredients, getIngredientById, updateIngredient } from '../controllers/api/Ingredients.controller.js'

const router = Router()

/*==========Ingredients Routes=================*/
router.get('/ingredients', getAllIngredients)
router.get('/ingredients/:id', getIngredientById)
router.post('/ingredients', createIngredient)
router.patch('/ingredients/:id', authOwnerOrAdmin, updateIngredient)
router.delete('/ingredients', authOwnerOrAdmin, deleteAllIngredient)
router.delete('/ingredients/:id', authOwnerOrAdmin, deleteIngredientById)

export default router
