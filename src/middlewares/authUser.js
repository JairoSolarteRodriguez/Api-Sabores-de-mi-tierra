import jwt from "jsonwebtoken"

import "dotenv/config"

const { REFRESH_TOKEN_SECRET } = process.env

export const authUser = async (req, res, next) => {
  try {
    const authorizationToken = req.header("Authorization")

    if(!authorizationToken) return res.status(401).send({message: `Autorización invalida`})
    
    const userToken = jwt.verify(authorizationToken, REFRESH_TOKEN_SECRET)
    if(!userToken) return res.status(400).send({ message: `Autorización invalida` })
    
    next()
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}`})
  }
}