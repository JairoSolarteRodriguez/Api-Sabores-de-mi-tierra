import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { User } from "../models/Users.js"
import { validateEmail, ActivationToken, sendMail } from "../helpers/helpers.js"

// Error messages
const errorFields = "Por favor llenar todos los campos."
const errorInvalidEmail = "El campo de correo no es valido."
const errorExistEmail = "El correo ya existe."
const errorCharactersPassword = "La contraseña debe tener minimo 6 carácteres."

export const getUsers = async (req, res) => {
  let { page, limit } = req.query

  try {
    parseInt(limit)
    parseInt(page)
  } catch (error) {
    return error
  }

  if (!limit) {
    limit = 5
  }

  if (!page) {
    page = 1
  }

  try {
    const users = await User.findAll({
      attributes: [
        "user_id",
        "username",
        "user_email",
        "user_is_admin",
        "user_is_staff",
        "last_login",
        "createdAt",
        "updatedAt",
      ],
      offset: page === 1 ? 0 : limit * (page - 1), // the query begins at the registration number
      limit: limit, // number of records returned
    })

    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio: ${error}` })
  }
}

export const createUser = async (req, res) => {
  try {
    const {
      user_email,
      user_is_staff,
      user_is_admin,
      last_login,
      password,
      username,
    } = req.body

    // Validate blank fields
    if (!user_email || !password || !username)
      return res.status(400).send({ message: errorFields })

    // Validate correct email
    if (!validateEmail(user_email))
      return res.status(400).send({ message: errorInvalidEmail })

    // Validate if exist email
    const user = await User.findOne({ where: { user_email: user_email } })
    if (user) return res.status(400).send({ message: errorExistEmail })

    // Validate password length
    if (password.length < 6)
      return res.status(400).send({ message: errorCharactersPassword })

    const passwordHash = await bcrypt.hash(password, 12) // Encryp password

    const newUser = {
      user_email,
      user_is_admin,
      user_is_staff,
      last_login,
      password: passwordHash,
      username,
    }

    const activationToken = ActivationToken(newUser)

    sendMail(user_email, 'Activación de cuenta sabores de mi tierra', activationToken)

    return res.status(200).send({
      message: `Usuario creado, recibirá un correo de activación de cuenta al correo: ${user_email}`,
      activationToken,
    })
  } catch (error) {
    return res.send(500).send({ message: `Algo ocurrio: ${error}` })
  }
}

export const activationUser = async (req, res) => {
  try {
    const { activationToken } = req.body

    const user = jwt.verify(
      activationToken,
      process.env.ACTIVATION_TOKEN_SECRET
    )

    const {
      user_email,
      user_is_admin,
      user_is_staff,
      last_login,
      password,
      username,
    } = user

    const newUser = await User.create({
      user_email,
      user_is_admin,
      user_is_staff,
      last_login,
      password,
      username,
    })

    return res.status(200).send({ message: "Activación exitosa", data_user: newUser })
  } catch (error) {
    return res.status(500).send({ message: error })
  }
}
