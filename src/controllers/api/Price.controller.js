import { Prices } from '../../models/Prices.js'

export const getAllPrices = async (req, res) => {
  try {
    const prices = await Prices.findAll()

    if(prices) return res.status(200).send( prices )
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const getPriceById = async (req, res) => {
  try {
    const { id }  = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const prices = await Prices.findOne({ where: { priceId : id }})

    if(!prices) return res.status(200).send({ message: `No se ecuentra el precio con el id: ${id}` })

    if(prices) return res.status(200).send( prices )
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createPrices = async (req, res) => {
  try {
    const {
      priceSufix
    } = req.body

    if(!priceSufix) return res.status(400).send({ message: `El campo precio no puede ir vacio` })
  
    const newPrice = await Prices.create({ priceSufix })
  
    console.log(newPrice)
    if(newPrice) return res.status(200).send({ message: `Se ha creado el sufijo de precio: ${newPrice.priceSufix}` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updatePrice = async (req, res) => {
  try {
    const { id }  = req.params
    const { priceSufix } = req.body

    if(!priceSufix) return res.status(400).send({ message: `El campo precio no puede ir vacio` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const prices = await Prices.update({ priceSufix: priceSufix }, {
      where: {
        priceId: id
      }
    })

    if(prices[0] === 0) return res.status(200).send({ message: `No se ecuentra el sufijo para precio con el id: ${id}` })

    if(prices[0] >= 1) return res.status(200).send({ message: `El sufijo para precio se ha actualizado` })
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
        priceId: id
      }
    })

    if(price === 0 ) return res.status(200).send({ message: `No se ecuentra el sufijo para precio con el id: ${id}` })

    if(price === 1 ) return res.status(200).send({ message: `El sufijo para precio se ha eliminado correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteAllPrices =  async (req, res) => {
  try {
    const prices = await Prices.destroy({ truncate: { cascade: true } })

    return res.status(200).send({ message: `Se han eliminado ${prices} sufijo(s) correctamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}