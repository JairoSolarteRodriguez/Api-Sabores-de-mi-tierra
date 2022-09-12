import { Tools } from '../../models/Tools.js'

export const getAllTools = async (req, res) => {
  try {
    const tools = await Tools.findAll()

    if(tools) return res.status(200).send( tools )
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getToolsById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const tools = await Tools.findOne({ where: { toolId : id }})

    if(!tools) return res.status(200).send({ message: `No se ecuentra el instrumento con el id: ${id}` })

    if(tools) return res.status(200).send( tools )
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createTool = async (req, res) => {
  try {
    const {
      toolName
    } = req.body

    if(!toolName) return res.status(400).send({ message: `El campo instrumento no puede ir vacio` })
  
    const newTool = await Tools.create({ toolName })
  
    if(newTool) return res.status(200).send({ message: `Se ha creado el instrumento: ${newTool.toolName}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateTool = async (req, res) => {
  try {
    const { id }  = req.params
    const { toolName } = req.body

    if(!toolName) return res.status(400).send({ message: `El campo instrumento no puede ir vacio` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const tools = await Tools.update({ toolName }, {
      where: {
        toolId: id
      }
    })

    if(tools[0] === 0) return res.status(200).send({ message: `No se ecuentra el instrumento con el id: ${id}` })

    if(tools[0] >= 1) return res.status(200).send({ message: `El instrumento se ha actualizado` })
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
        toolId: id
      }
    })

    if(tool === 0 ) return res.status(200).send({ message: `No se ecuentra el instrumento con el id: ${id}` })

    if(tool === 1 ) return res.status(200).send({ message: `El instrumento se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllTools =  async (req, res) => {
  try {
    const tool = await Tools.destroy({ truncate: { cascade: true } })

    return res.status(200).send({ message: `Se han eliminado ${tool} instrumento(s) correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}