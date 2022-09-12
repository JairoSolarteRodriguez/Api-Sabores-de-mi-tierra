import { Dificult } from "../../models/Dificults.js"

export const getAllDificults = async (req, res) => {
  try {
    const dificults = await Dificult.findAll()

    if(dificults) return res.status(200).send( dificults )
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getDificultById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const dificult = await Dificult.findOne({ where: { dificultId : id }})

    if(!dificult) return res.status(200).send({ message: `No se ecuentra la dificultad con el id: ${id}` })

    if(dificult) return res.status(200).send( dificult )
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createDificult = async (req, res) => {
  try {
    const {
      dificultName
    } = req.body

    if(!dificultName) return res.status(400).send({ message: `El campo dificulta no puede ir vacio` })
  
    const newDificult = await Dificult.create({ dificultName })
  
    if(newDificult) return res.status(200).send({ message: `Se ha creado la dificultad: ${ newDificult.dificultName }` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateDificult = async (req, res) => {
  try {
    const { id }  = req.params
    const { dificultName } = req.body

    if(!dificultName) return res.status(400).send({ message: `El campo dificulta no puede ir vacio` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const dificult = await Dificult.update({ dificultName }, {
      where: {
        dificultId: id
      }
    })

    if(dificult[0] === 0) return res.status(200).send({ message: `No se ecuentra la dificultad con el id: ${id}` })

    if(dificult[0] >= 1) return res.status(200).send({ message: `La dificultad se ha actualizado` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteDificultById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const dificult = await Dificult.destroy({
      where: {
        dificultId: id
      }
    })

    if(dificult === 0 ) return res.status(200).send({ message: `No se ecuentra la dificultad con el id: ${id}` })

    if(dificult === 1 ) return res.status(200).send({ message: `La dificultad se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllDificults =  async (req, res) => {
  try {
    const dificult = await Dificult.destroy({ truncate: { cascade: true } })

    return res.status(200).send({ message: `Se han eliminado ${dificult} dificultad(es) correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}