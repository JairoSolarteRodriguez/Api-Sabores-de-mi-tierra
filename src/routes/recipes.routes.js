import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'
import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

import { createRecipes, getRecipeById, getAllRecipes, deleteRecipeById, deleteAllRecipes, updateRecipeById, restrictRecipeById, privacityRecipeById, blockRecipeById } from '../controllers/recipes/recipes.controller.js'
import { createFullRecipe } from '../controllers/fullRecipes/fullRecipes.controller.js'

const router = Router()

/*==========Recipes Routes=================*/
router.get('/recipes', getAllRecipes)
router.get('/recipes/:id', getRecipeById)
router.post('/recipes', createRecipes)
router.post('/add-recipe', createFullRecipe)
router.patch('/recipes/:id', authOwnerOrAdmin, updateRecipeById)
router.patch('/recipes-privacity/:id', authOwnerOrAdmin, privacityRecipeById)
router.delete('/recipes/:id', authAdmin, deleteRecipeById)
router.delete('/recipes', authAdmin, deleteAllRecipes)
router.patch('/recipes-restrict/:id', authAdmin, restrictRecipeById)
router.patch('/recipes-block/:id', authAdmin, blockRecipeById)

export default router