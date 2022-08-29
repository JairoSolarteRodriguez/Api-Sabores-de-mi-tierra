import { Tools } from '../../models/Tools.js'

export const getAllTools = async (req, res) => {
  try {
    const tools = await Tools.findAll()

    if(tools) return res.status(200).send({ tools })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getToolsById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const tools = await Tools.findOne({ where: { tool_id : id }})

    if(!tools) return res.status(200).send({ message: `No se ecuentra el instrumento con el id: ${id}` })

    if(tools) return res.status(200).send({ tools })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createTool = async (req, res) => {
  try {
    const {
      tool_name
    } = req.body

    if(!tool_name) return res.status(400).send({ message: `El campo instrumento no puede ir vacio` })
  
    const newTool = await Tools.create({ tool_name })
  
    if(newTool) return res.status(200).send({ message: `Se ha creado el instrumento: ${newTool.tool_name}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateTool = async (req, res) => {
  try {
    const { id }  = req.params
    const { tool_name } = req.body

    if(!tool_name) return res.status(400).send({ message: `El campo instrumento no puede ir vacio` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const tools = await Tools.update({ tool_name }, {
      where: {
        tool_id: id
      }
    })

    if(!tools) return res.status(200).send({ message: `No se ecuentra el instrumento con el id: ${id}` })

    if(tools) return res.status(200).send({ message: `El instrumento se ha actualizado` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteToolById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const tool = await Tools.destroy({
      where: {
        tool_id: id
      }
    })

    if(!tool) return res.status(200).send({ message: `No se ecuentra el instrumento con el id: ${id}` })

    if(tool) return res.status(200).send({ message: `El instrumento se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllTools =  async (req, res) => {
  try {
    const tool = await Tools.destroy({ truncate: true })

    if(!tool) return res.status(200).send({ message: `Se han eliminado los instrumentos correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}