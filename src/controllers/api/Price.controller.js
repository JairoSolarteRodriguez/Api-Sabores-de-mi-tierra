import { Prices } from '../../models/Prices.js'

export const getAllPrices = async (req, res) => {
  try {
    const prices = await Prices.findAll()

    if(prices) return res.status(200).send({ prices })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getPriceById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const prices = await Prices.findOne({ where: { price_id : id }})

    if(!prices) return res.status(200).send({ message: `No se ecuentra el precio con el id: ${id}` })

    if(prices) return res.status(200).send({ prices })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createPrices = async (req, res) => {
  try {
    const {
      price_sufix
    } = req.body

    if(!price_sufix) return res.status(400).send({ message: `El campo precio no puede ir vacio` })
  
    const newPrice = await Prices.create({ price_sufix })
  
    console.log(newPrice)
    if(newPrice) return res.status(200).send({ message: `Se ha creado el sufijo de precio: ${newPrice.price_sufix}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updatePrice = async (req, res) => {
  try {
    const { id }  = req.params
    const { price_sufix } = req.body

    if(!price_sufix) return res.status(400).send({ message: `El campo precio no puede ir vacio` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const prices = await Prices.update({ price_sufix }, {
      where: {
        price_id: id
      }
    })

    if(!prices) return res.status(200).send({ message: `No se ecuentra el sufijo para precio con el id: ${id}` })

    if(prices) return res.status(200).send({ message: `El sufijo para precio se ha actualizado` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deletePriceById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const price = await Prices.destroy({
      where: {
        price_id: id
      }
    })

    if(!price) return res.status(200).send({ message: `No se ecuentra el sufijo para precio con el id: ${id}` })

    if(price) return res.status(200).send({ message: `El sufijo para precio se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllPrices =  async (req, res) => {
  try {
    const prices = await Prices.destroy({ truncate: true })

    if(!prices) return res.status(200).send({ message: `Se han eliminado todos los sufijos para precio correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}