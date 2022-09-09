import { Recipes } from "../../models/Recipes.js";

// Error messages
const errorFields = "Por favor llenar todos los campos."

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.findAll()

    if (recipes) return res.status(200).send(recipes)
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipes = await Recipes.findOne({ where: { recipe_id: id } })

    if (!recipes) return res.status(200).send({ message: `No se ecuentra la receta con el id: ${id}` })

    if (recipes) return res.status(200).send(recipes)
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createRecipes = async (req, res) => {
  try {
    const {
      user_id,
      price_id,
      recipe_dificult,
      recipe_name,
      recipe_photo,
      recipe_portions,
      recipe_time,
      recipe_description,
    } = req.body

    if (!recipe_name | !recipe_description) return res.status(400).send({ message: errorFields })

    const newRecipe = await Recipes.create({
      user_id,
      price_id,
      recipe_dificult,
      recipe_name,
      recipe_photo,
      recipe_portions,
      recipe_time,
      recipe_description
    })

    if (newRecipe) return res.status(200).send({ message: `Se ha creado la receta: ${newRecipe.recipe_name}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateRecipeById = async (req, res) => {
  try {
    const { id } = req.params
    const {
      user_id,
      price_id,
      recipe_dificult,
      recipe_name,
      recipe_photo,
      recipe_portions,
      recipe_time,
      recipe_description
    } = req.body

    if (!recipe_name | !recipe_description) return res.status(400).send({ message: errorFields })

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipe = await Recipes.update({
      user_id,
      price_id,
      recipe_dificult,
      recipe_name,
      recipe_photo,
      recipe_portions,
      recipe_time,
      recipe_description
    }, {
      where: {
        recipe_id: id
      }
    })

    if (!recipe) return res.status(200).send({ message: `No se ecuentra la receta con el id: ${id}` })

    if (recipe) return res.status(200).send({ message: `La receta se ha actualizado` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteRecipeById = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipes = await Recipes.destroy({
      where: {
        recipe_id: id
      }
    })

    if (!recipes) return res.status(200).send({ message: `No se ecuentra la receta con el id: ${id}` })

    if (recipes) return res.status(200).send({ message: `La receta se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.destroy({ truncate: true })

    if (!recipes) return res.status(200).send({ message: `Se han eliminado las recetas correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const restrictRecipeById = async (req, res) => {
  try {
    const { id } = req.params
    const {
      recipe_restricted
    } = req.body

    if (!recipe_restricted) return res.status(400).send({ message: 'No se recibio ningún cambio de restricción' })

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipe = await Recipes.update({
      recipe_restricted
    }, {
      where: {
        recipe_id: id
      }
    })

    if (!recipe) return res.status(200).send({ message: `No se ecuentra la receta con el id: ${id}` })

    if (recipe) return res.status(200).send({ message: `Se ha restringido la receta #${id}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const blockRecipeById = async (req, res) => {
  try {
    const { id } = req.params
    const {
      recipe_blocked
    } = req.body

    if (!recipe_blocked) return res.status(400).send({ message: 'No se recibio ningún cambio de bloqueo' })

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipe = await Recipes.update({
      recipe_blocked
    }, {
      where: {
        recipe_id: id
      }
    })

    if (!recipe) return res.status(200).send({ message: `No se ecuentra la receta con el id: ${id}` })

    if (recipe) return res.status(200).send({ message: `Se ha bloqueado la receta #${id}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const privacityRecipeById = async (req, res) => {
  try {
    const { id } = req.params
    const {
      recipe_privacity
    } = req.body

    if (!recipe_privacity) return res.status(400).send({ message: 'No se recibio ningún cambio de privacidad' })

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipe = await Recipes.update({
      recipe_privacity
    }, {
      where: {
        recipe_id: id
      }
    })

    if (!recipe) return res.status(200).send({ message: `No se ecuentra la receta con el id: ${id}` })

    if (recipe) return res.status(200).send({ message: `La privacidad de la receta se ha actualizado` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}



