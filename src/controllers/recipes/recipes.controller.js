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

    const recipes = await Recipes.findOne({ where: { recipeId: id } })

    if (!recipes) return res.status(200).send({ message: `No se ecuentra la receta con el id: ${id}` })

    if (recipes) return res.status(200).send(recipes)
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

// export const createRecipes = async (req, res) => {
//   try {
//     const {
//       userId,
//       priceId,
//       recipeDificult,
//       recipeName,
//       recipePhoto,
//       recipePortions,
//       recipeTime,
//       recipeDescription,
//     } = req.body

//     if (!recipeName | !recipeDescription) return res.status(400).send({ message: errorFields })

//     const newRecipe = await Recipes.create({
//       userId,
//       priceId,
//       recipeDificult,
//       recipeName,
//       recipePhoto,
//       recipePortions,
//       recipeTime,
//       recipeDescription
//     })

//     if (newRecipe) return res.status(200).send({ message: `Se ha creado la receta: ${newRecipe.recipeName}` })
//   } catch (error) {
//     return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
//   }
// }

export const updateRecipeById = async (req, res) => {
  try {
    const { id } = req.params
    const {
      userId,
      priceId,
      recipeDificult,
      recipeName,
      recipePhoto,
      recipePortions,
      recipeTime,
      recipeDescription
    } = req.body

    if (!recipeName | !recipeDescription) return res.status(400).send({ message: errorFields })

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipe = await Recipes.update({
      userId,
      priceId,
      recipeDificult,
      recipeName,
      recipePhoto,
      recipePortions,
      recipeTime,
      recipeDescription
    }, {
      where: {
        recipeId: id
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
        recipeId: id
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
    const recipes = await Recipes.destroy({ truncate: { cascade: true } })

    return res.status(200).send({ message: `Se han eliminado ${recipes} receta(s) correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const restrictRecipeById = async (req, res) => {
  try {
    const { id } = req.params
    const {
      recipeRestricted
    } = req.body

    if (!recipeRestricted) return res.status(400).send({ message: 'No se recibio ningún cambio de restricción' })

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipe = await Recipes.update({
      recipeRestricted
    }, {
      where: {
        recipeId: id
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
      recipeBlocked
    } = req.body

    if (!recipeBlocked) return res.status(400).send({ message: 'No se recibio ningún cambio de bloqueo' })

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipe = await Recipes.update({
      recipeBlocked
    }, {
      where: {
        recipeId: id
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
      recipePrivacity
    } = req.body

    if (!recipePrivacity) return res.status(400).send({ message: 'No se recibio ningún cambio de privacidad' })

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const recipe = await Recipes.update({
      recipePrivacity
    }, {
      where: {
        recipeId: id
      }
    })

    if (!recipe) return res.status(200).send({ message: `No se ecuentra la receta con el id: ${id}` })

    if (recipe) return res.status(200).send({ message: `La privacidad de la receta se ha actualizado` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}



