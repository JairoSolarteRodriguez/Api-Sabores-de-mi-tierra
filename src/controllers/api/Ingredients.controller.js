import { Ingredients } from '../../models/Ingredients.js'

export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredients.findAll()

    if(ingredients) return res.status(200).send( ingredients )
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getIngredientById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const ingredients = await Ingredients.findOne({ where: { ingredientId : id }})

    if(!ingredients) return res.status(200).send({ message: `No se ecuentra el ingrediente con el id: ${id}` })

    if(ingredients) return res.status(200).send( ingredients )
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createIngredient = async (req, res) => {
  try {
    const {
      ingredientName,
      quantity,
      measureId
    } = req.body

    if(!ingredientName || !measureId || !quantity) return res.status(400).send({ message: `Por favor rellene todos los campos` })
  
    const newIngredient = await Ingredients.create({  
      ingredientName,
      quantity,
      measureId 
    })
  
    if(newIngredient) return res.status(200).send({ message: `Se ha creado el ingrediente: ${newIngredient.ingredientName}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateIngredient = async (req, res) => {
  try {
    const { id }  = req.params
    const { ingredientName, quantity } = req.body

    if(!ingredientName) return res.status(400).send({ message: `El campo ingrediente no puede ir vacio` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const ingredient = await Ingredients.update({ ingredientName, quantity }, {
      where: {
        ingredientId: id
      }
    })

    if(ingredient[0] === 0) return res.status(200).send({ message: `No se ecuentra el ingrediente con el id: ${id}` })

    if(ingredient[0] >= 1) return res.status(200).send({ message: `El ingrediente se ha actualizado` })
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
        ingredientId: id
      }
    })

    if(ingredient === 0 ) return res.status(200).send({ message: `No se ecuentra el ingrediente con el id: ${id}` })

    if(ingredient === 1 ) return res.status(200).send({ message: `El ingrediente se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllIngredient =  async (req, res) => {
  try {
    const ingredient = await Ingredients.destroy({ truncate: { cascade: true } })

    return res.status(200).send({ message: `Se han eliminado ${ingredient} ingrediente(s) correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}