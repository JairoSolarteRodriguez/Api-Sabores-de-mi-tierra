import { FavoriteRecipes } from '../../models/FavoriteRecipes.js'

export const addFavRecipe = async (req, res) => {
  try {
    const { 
      recipeId, 
      userId
    } = req.body

    if(!recipeId || !userId) return res.status(400).send({ message: `Por favor enviar un usuario y una receta` })

    const favRecipe = await FavoriteRecipes.create({
      userUserId: userId,
      recipeRecipeId: recipeId
    })

    return res.status(200).send({ message: `Se ha agregado la receta a tu lista de favoritos.`, favRecipe })

  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` })
  }
}

export const deleteFavRecipe = async (req, res) => {
  try {
    const { id } = req.params
  
    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })
  
    const favRecipe = await FavoriteRecipes.destroy({
      where: {
        recipeRecipeId: id
      }
    })
  
    if(favRecipe === 0 ) return res.status(200).send({ message: `No se ecuentra la receta favorita con el id: ${id}` })
  
    if(favRecipe >= 1 ) return res.status(200).send({ message: `La receta favorita se eliminó` })
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` })
  }
}