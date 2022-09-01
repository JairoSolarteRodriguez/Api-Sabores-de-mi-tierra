import { Measures } from "../../models/Measures.js"

export const getAllMeasures = async (req, res) => {
  try {
    const measures = await Measures.findAll()

    if(measures) return res.status(200).send({ measures })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getMeasureById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const measures = await Measures.findOne({ where: { measure_id : id }})

    if(!measures) return res.status(200).send({ message: `No se ecuentra la medida con el id: ${id}` })

    if(measures) return res.status(200).send({ measures })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createMeasure = async (req, res) => {
  try {
    const {
      measure_sufix
    } = req.body

    if(!measure_sufix) return res.status(400).send({ message: `El campo medida no puede ir vacio` })
  
    const newMeasure = await Measures.create({ measure_sufix })
  
    if(newMeasure) return res.status(200).send({ message: `Se ha creado la medida: ${newMeasure.measure_sufix}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateMeasure = async (req, res) => {
  try {
    const { id }  = req.params
    const { measure_sufix } = req.body

    if(!measure_sufix) return res.status(400).send({ message: `El campo medida no puede ir vacio` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const measure = await Measures.update({ measure_sufix }, {
      where: {
        measure_id: id
      }
    })

    if(!measure) return res.status(200).send({ message: `No se ecuentra la medida con el id: ${id}` })

    if(measure) return res.status(200).send({ message: `La medida se ha actualizado` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteMeasureById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const measure = await Measures.destroy({
      where: {
        measure_id: id
      }
    })

    if(!measure) return res.status(200).send({ message: `No se ecuentra la medida con el id: ${id}` })

    if(measure) return res.status(200).send({ message: `La medida se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllMeasures =  async (req, res) => {
  try {
    const measure = await Measures.destroy({ truncate: true })

    if(!measure) return res.status(200).send({ message: `Se han eliminado las medidas correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}