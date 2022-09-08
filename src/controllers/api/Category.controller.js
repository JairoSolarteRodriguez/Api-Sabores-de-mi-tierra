import { Categories } from "../../models/Categories.js"

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll()

    if(categories) return res.status(200).send({ categories })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const categories = await Categories.findOne({ where: { category_id : id }})

    if(!categories) return res.status(200).send({ message: `No se ecuentra la categoria con el id: ${id}` })

    if(categories) return res.status(200).send({ categories })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createCategory = async (req, res) => {
  try {
    const {
      category_name
    } = req.body

    if(!category_name) return res.status(400).send({ message: `El campo categoria no puede ir vacio` })
  
    const newCategory = await Categories.create({ category_name })
  
    console.log(newCategory)
    if(newCategory) return res.status(200).send({ message: `Se ha creado la categoria: ${newCategory.category_name}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { id }  = req.params
    const { category_name } = req.body

    if(!category_name) return res.status(400).send({ message: `El campo categoria no puede ir vacio` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const categories = await Categories.update({ category_name }, {
      where: {
        category_id: id
      }
    })

    if(categories[0] === 0) return res.status(200).send({ message: `No se ecuentra la categoria con el id: ${id}` })

    if(categories[0] >= 1) return res.status(200).send({ message: `La categoria se ha actualizado` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteCategoryById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const categories = await Categories.destroy({
      where: {
        category_id: id
      }
    })

    if(categories === 0 ) return res.status(200).send({ message: `No se ecuentra la categoria con el id: ${id}` })

    if(categories === 1 ) return res.status(200).send({ message: `La categoria se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllCategory =  async (req, res) => {
  try {
    const categories = await Categories.destroy({ truncate: true })

    if(categories === 1 ) return res.status(200).send({ message: `Se han eliminado las categorias correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}