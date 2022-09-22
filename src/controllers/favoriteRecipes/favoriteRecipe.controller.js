import { FavoriteRecipes } from '../../models/FavoriteRecipes.js'
import { sequelize } from "../../db/db.js";
import jwt from "jsonwebtoken"

import "dotenv/config"

const { REFRESH_TOKEN_SECRET } = process.env

export const getFavRecipes = async (req, res) => {
  const { userId } = req.params
  let { page, limit } = req.query;

  try {
    parseInt(limit);
    parseInt(page);
  } catch (error) {
    return error;
  }

  !limit ? (limit = 5) : limit;
  !page ? (page = 1) : page;

  try {

    const [recipesFav] = await sequelize.query(`
    SELECT r."userId", r."recipeId", r."recipeName", d."dificultName", p."priceSufix", r."recipePhoto", r."recipePortions", 
    r."recipeTime", r."recipeDescription", r."recipePrivacity", r."createdAt"
    FROM recipes r
    JOIN prices p ON p."priceId" = r."priceId" 
    JOIN dificults d ON d."dificultId" = r."recipeDificult"
    JOIN favorite_recipes fr ON fr."recipeRecipeId" = r."recipeId"
    WHERE fr."userUserId" = ${userId}
    `);

    if (recipes.length === 0) return res.status(400).send({ message: `Aún no tiene recetas favoritas` });

    return res
      .status(200)
      .send(recipes.slice(page === 1 ? 0 : limit * (page - 1), limit * page));
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` })
  }
}

export const addFavRecipe = async (req, res) => {
  try {
    const {
      recipeId,
      userId
    } = req.body

    const { authorization } = req.headers

    const userToken = jwt.verify(authorization, REFRESH_TOKEN_SECRET)

    if(userId === userToken.id) return res.status(400).send({ message: `No puede agregar sus propias recetas a favorito.` })

    if (!recipeId || !userId) return res.status(400).send({ message: `Por favor enviar un usuario y una receta` })

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

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const favRecipe = await FavoriteRecipes.destroy({
      where: {
        recipeRecipeId: id
      }
    })

    if (favRecipe === 0) return res.status(200).send({ message: `No se ecuentra la receta favorita con el id: ${id}` })

    if (favRecipe >= 1) return res.status(200).send({ message: `La receta favorita se eliminó` })
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` })
  }
}