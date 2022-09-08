import { Steps } from "../../models/Steps.js"

export const getStepById = async (req, res) => {
  try {
    const { id } = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const step = await Steps.findOne({ where: { step_id: id } })

    if(!step) return res.status(400).send({ message: `No se encuentra el paso` })

    if(step) return res.status(200).send({ step })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const createStep = async (req, res) => {
  try {
    const {
      step_number,
      step_image,
      step_description,
    } = req.body
    
    if(!step_number || !step_description) return res.status(400).send({ message: `Los campos número de paso y descripción son obligatorios`})

    const newStep = await Steps.create({
      step_number,
      step_image,
      step_description
    })


    if(newStep) return res.status(200).send({ message: `Se ha creado el paso` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}
//TODO: arreglar la actualización del owner
export const updateStepDescription = async (req, res) => {
  try {
    const { id } = req.params
    const { step_description } = req.body
  
    if(!id) return res.status(400).send({ message: `Por favor enviar el id` })
  
    if(!step_description) return res.status(400).send({ message: `Campo descripcion requerido` })
  
    const step = await Steps.update({ step_description }, {
      where: {
        step_id: id
      }
    })
  
    if(step[0] === 0) return res.status(400).send({ message: `No se encuenta el paso` })
  
    if(step[0] >= 1) return res.status(200).send({ message: `El paso se ha actualizado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}
//TODO: arreglar la actualización del owner
export const updateStepImage = async (req, res) => {
  try {
    const { id } = req.params
    const { step_image } = req.body
  
    if(!id) return res.status(400).send({ message: `Por favor enviar el id` })
  
    if(!step_image) return res.status(400).send({ message: `Campo imagen requerido` })
  
    const step = await Steps.update({ step_image }, {
      where: {
        step_id: id
      }
    })
  
    if(step[0] === 0) return res.status(400).send({ message: `No se encuenta el paso` })
  
    if(step[0] >= 1) return res.status(200).send({ message: `El paso se ha actualizado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}
//TODO: arreglar la eliminación del owner
export const deleteStepById = async (req, res) => {
  try {
    const { id } = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const step = await Steps.destroy({
      where: {
        step_id: id
      }
    })

    if(step === 0 ) return res.status(400).send({ message: `No se encuenta el paso` })

    if(step === 1 ) return res.status(200).send({ message: `Se ha eliminado el paso` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}