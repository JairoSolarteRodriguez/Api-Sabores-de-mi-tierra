import { Router } from 'express'

// Middlewares
import { authAdmin } from '../middlewares/authAdmin.js'
import { authOwnerOrAdmin } from '../middlewares/authOwnerOrAdmin.js'

import { getRecipeById, getAllRecipes, deleteRecipeById, deleteAllRecipes, updateRecipeById, restrictRecipeById, privacityRecipeById, blockRecipeById } from '../controllers/recipes/recipes.controller.js'
import { createFullRecipe, getFullRecipeByRecipeId } from '../controllers/fullRecipes/fullRecipes.controller.js'

const router = Router()

/*==========Recipes Routes=================*/
router.get('/recipes', getAllRecipes)
router.get('/recipes/:id', getRecipeById)
router.patch('/recipes/:id', updateRecipeById)
router.patch('/recipes-privacity/:id', privacityRecipeById)
router.delete('/recipes/:id', deleteRecipeById)
router.delete('/recipes', deleteAllRecipes)
router.patch('/recipes-restrict/:id', restrictRecipeById)
router.patch('/recipes-block/:id', blockRecipeById)

// Full recipes controller.
router.post('/add-recipe', createFullRecipe)
router.get('/get-recipes/:recipe_id', getFullRecipeByRecipeId)

export default router