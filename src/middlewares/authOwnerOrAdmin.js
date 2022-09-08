import { User } from '../models/Users.js'
import jwt from "jsonwebtoken"

import "dotenv/config"

const { REFRESH_TOKEN_SECRET } = process.env

export const authOwnerOrAdmin = async (req, res, next) => {
  try {
    const authorizationToken = req.header("Authorization")
    const eliminatedId = req.params.id

    console.log({eliminatedId})

    if(!authorizationToken) return res.status(401).send({ message: `Authorización inválida` })
    
    const userToken = jwt.verify(authorizationToken, REFRESH_TOKEN_SECRET)
    if(!userToken) return res.status(400).send({ message: `Authorización inválida` })

    const user = await User.findOne({ where: {user_id: userToken.id }})
    if(!user || user.length === 0 ) return res.status(400).send({ message: `Authorización inválida` })

    if(parseInt(user.user_id) === parseInt(eliminatedId) || user.user_is_admin || user.user_is_staff){
      next()
    }else{
      return res.status(401).send({message: "Autorización invalida"})
    }
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}`})
  }
}