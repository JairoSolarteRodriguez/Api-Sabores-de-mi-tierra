import { Ingredients } from '../../models/Ingredients.js'

export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredients.findAll()

    if(ingredients) return res.status(200).send({ ingredients })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getIngredientById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const ingredients = await Ingredients.findOne({ where: { ingredient_id : id }})

    if(!ingredients) return res.status(200).send({ message: `No se ecuentra el ingrediente con el id: ${id}` })

    if(ingredients) return res.status(200).send({ ingredients })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createIngredient = async (req, res) => {
  try {
    const {
      ingredient_name
    } = req.body

    if(!ingredient_name) return res.status(400).send({ message: `El campo ingrediente no puede ir vacio` })
  
    const newIngredient = await Ingredients.create({ ingredient_name })
  
    if(newIngredient) return res.status(200).send({ message: `Se ha creado el ingrediente: ${newIngredient.ingredient_name}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateIngredient = async (req, res) => {
  try {
    const { id }  = req.params
    const { ingredient_name } = req.body

    if(!ingredient_name) return res.status(400).send({ message: `El campo ingrediente no puede ir vacio` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const ingredient = await Ingredients.update({ ingredient_name }, {
      where: {
        ingredient_id: id
      }
    })

    if(!ingredient) return res.status(200).send({ message: `No se ecuentra el ingrediente con el id: ${id}` })

    if(ingredient) return res.status(200).send({ message: `El ingrediente se ha actualizado` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteIngredientById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const ingredient = await Ingredients.destroy({
      where: {
        ingredient_id: id
      }
    })

    if(!ingredient) return res.status(200).send({ message: `No se ecuentra el ingrediente con el id: ${id}` })

    if(ingredient) return res.status(200).send({ message: `El ingrediente se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllIngredient =  async (req, res) => {
  try {
    const ingredient = await Ingredients.destroy({ truncate: true })

    if(!ingredient) return res.status(200).send({ message: `Se han eliminado los ingredientes correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}