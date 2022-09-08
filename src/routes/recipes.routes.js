import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'
import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

import { createRecipes, getRecipeById, getAllRecipes, deleteRecipeById, deleteAllRecipes, updateRecipeById, restrictRecipeById, privacityRecipeById, blockRecipeById } from '../controllers/recipes/recipes.controller.js'

const router = Router()

/*==========Recipes Routes=================*/
router.get('/recipes', getAllRecipes)
router.get('/recipes/:id', authOwnerOrAdmin, getRecipeById)
router.post('/recipe', createRecipes)
router.patch('/recipe/:id', authOwnerOrAdmin, updateRecipeById)
router.patch('/recipe-privacity/:id', authOwnerOrAdmin, privacityRecipeById)
router.delete('/recipe/:id', authOwnerOrAdmin, deleteRecipeById)
router.delete('/recipes', authAdmin, deleteAllRecipes)
router.patch('/recipe-restrict/:id', authAdmin, restrictRecipeById)
router.patch('/recipe-block/:id', authAdmin, blockRecipeById)

export default router