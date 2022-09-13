import { Steps } from "../../models/Steps.js"

export const getStepById = async (req, res) => {
  try {
    const { id } = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const step = await Steps.findOne({ where: { stepId: id } })

    if(!step) return res.status(400).send({ message: `No se encuentra el paso` })

    if(step) return res.status(200).send( step )
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const createStep = async (req, res) => {
  try {
    const {
      stepNumber,
      stepImage,
      stepDescription,
    } = req.body
    
    if(!stepNumber || !stepDescription) return res.status(400).send({ message: `Los campos número de paso y descripción son obligatorios`})

    const newStep = await Steps.create({
      stepNumber,
      stepImage,
      stepDescription
    })


    if(newStep) return res.status(200).send({ message: `Se ha creado el paso` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateStepDescription = async (req, res) => {
  try {
    const { id } = req.params
    const { stepDescription } = req.body
  
    if(!id) return res.status(400).send({ message: `Por favor enviar el id` })
  
    if(!stepDescription) return res.status(400).send({ message: `Campo descripcion requerido` })
  
    const step = await Steps.update({ stepDescription }, {
      where: {
        stepId: id
      }
    })
  
    if(step[0] === 0) return res.status(400).send({ message: `No se encuenta el paso` })
  
    if(step[0] >= 1) return res.status(200).send({ message: `El paso se ha actualizado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const updateStepImage = async (req, res) => {
  try {
    const { id } = req.params
    const { stepImage } = req.body
  
    if(!id) return res.status(400).send({ message: `Por favor enviar el id` })
  
    if(!stepImage) return res.status(400).send({ message: `Campo imagen requerido` })
  
    const step = await Steps.update({ stepImage }, {
      where: {
        stepId: id
      }
    })
  
    if(step[0] === 0) return res.status(400).send({ message: `No se encuenta el paso` })
  
    if(step[0] >= 1) return res.status(200).send({ message: `El paso se ha actualizado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteStepById = async (req, res) => {
  try {
    const { id } = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const step = await Steps.destroy({
      where: {
        stepId: id
      }
    })

    if(step === 0 ) return res.status(400).send({ message: `No se encuenta el paso` })

    if(step >= 1 ) return res.status(200).send({ message: `Se ha eliminado el paso` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}