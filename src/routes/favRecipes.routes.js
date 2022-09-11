import { Router } from 'express'

// Middlewares
import { authUser } from '../middlewares/authUser.js'

import { addFavRecipe, deleteFavRecipe } from '../controllers/favoriteRecipes/favoriteRecipe.controller.js'

const router = Router()

/*==========Fav Recipes Routes=================*/
router.post('/recipes-fav', addFavRecipe)
router.delete('/recipes-fav/:id', deleteFavRecipe)


export default router
