import jwt from "jsonwebtoken"

import { User } from "../models/Users.js"
import { validateEmail, ActivationToken, RefreshToken, sendMail, encryptPassword, comparePassword } from "../helpers/helpers.js"
import "dotenv/config"

const { ACTIVATION_TOKEN_SECRET } = process.env


// Error messages
const errorFields = "Por favor llenar todos los campos."
const errorInvalidEmail = "El campo de correo no es valido."
const errorExistEmail = "El correo ya existe."
const errorCharactersPassword = "La contraseña debe tener minimo 6 carácteres."
const incorrectUser = "El usuario o contraseña es incorrecto."

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
        "user_is_active",
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
    if (password.length < 6) return res.status(400).send({ message: errorCharactersPassword })

    const passwordHash = encryptPassword(password) // Encryp password

    const newUser = {
      user_email,
      user_is_admin,
      user_is_staff,
      last_login,
      password: passwordHash.trim(),
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
      password: password.trim(),
      username,
    })

    return res.status(200).send({ message: "Activación exitosa", data_user: newUser })
  } catch (error) {
    return res.status(500).send({ message: error })
  }
}

export const login = async (req, res) => {
  try {
    const { user_email, password } = req.body

    if(!user_email || !password) return res.status(400).send({ message: errorFields })

    const user = await User.findOne({ where: {user_email: user_email }})

    if(!user) return res.status(400).send({ message: incorrectUser })

    const passwordHash = user.password.trim()
    const isMatch = comparePassword(password, passwordHash) // compare password and password hash NOTE: password hash need sanitization (delete blank spaces)
    
    if(!isMatch) return res.status(400).send({ message: incorrectUser })
    
    const refresToken = RefreshToken({id: user.user_id})

    const date = new Date()
    // Update last login
    await User.update({ last_login: date.toISOString() }, {
      where: {
        user_id: user.user_id
      }
    })

    return res.status(200).send({
      email: user.user_email,
      user: user.username,
      user_is_active: !user.user_is_active ? `Tu cuenta esta deshabilitada, desea habilitarla?` : user.user_is_active,
      accessToken: refresToken,
      last_login: date.toISOString(),
      message: "Inicio de sesión exitoso"
    })

  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const verifyForUpdatePassword = async (req, res) => {
  try {
    const { email } = req.body

    if(!email) return res.status(400).send({ message: `Por favor rellene los campos` })  
    
    const user = await User.findOne({ where: { user_email: email }})
    
    if(!user || user.length === 0) return res.status(400).send({ message: `El correo ${email} no se encuentra registrado` })
    
    const newUser = {
      id: user.user_id,
      username: user.username,
      user_email: user.user_email
    }
    
    const token = ActivationToken(newUser)
    sendMail(user.user_email, `Cambio de contraseña`, token, true)
    return res.status(200).send({ message: `Verifique su correo (${user.user_email}) para cambiar la contraseña` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })    
  }
}

export const updatePassword = async(req, res) => {
  try {
    const { email, token, password, passwordConfirm } = req.body
  
    const user = await User.findOne({ where: { user_email: email }})
    if(!user || user.length === 0) return res.status(400).send({ message: `El correo electrónico no es válido por favor realizar el proceso nuevamente` })
    
    const verifyEmail = jwt.verify(token, ACTIVATION_TOKEN_SECRET)
    if(!verifyEmail) return res.status(400).send({ message: `La petición de cambio de contraseña ha expirado` })

    if(!password || !passwordConfirm) return res.status(400).send({ message: `Por favor rellene todos los campos` })

    if(password !== passwordConfirm) return res.status(400).send({ message: `Las contraseñas no coinciden` })
    const newPassword = encryptPassword(password)
  
    if(user.user_email === verifyEmail.user_email){
      const correctEmail = user.user_email
  
      await User.update({ password: newPassword }, {
        where: {
          user_email: correctEmail
        }
      })
  
      return res.status(200).send({ message: `contraseña ha sido cambiada` })
    }

    return res.status(400).send({ message: `Ha ocurrido un error por favor realizar el proceso nuevamente` })
  } catch (error) {
    return res.status(500).send(`Ha ocurrido un error: ${error}`)
  }
}

export const deleteUser = async(req, res) => {
  try {
    const { id } = req.params
    const userId = parseInt(id)

    const deleted = await User.destroy({
      where: {
        user_id: userId
      }
    })
    
    if(deleted === 1 ) return res.status(200).send({ message: `Usuario ${userId} eliminado exitosamente` })
    
    if(deleted === 0 ) return res.status(400).send({ message: `El usuario ${userId} no fue encontrado` })
    
    return res.status(200).send({ message: deleted })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const disableUser = async(req, res) => { // Disabled a user
  try {
    const { isActive } = req.body
    const { id } = req.params
    const userId = parseInt(id)

    const updatedUser = await User.update({ user_is_active: isActive }, {
      where: {
        user_id: userId
      }
    })

    if(!updatedUser || updatedUser[0] === 0) return res.status(400).send({ message: `Usuario no encontrado` })

    if(updatedUser[0] === 1) return res.status(200).send({ message: `Usuario ${userId} modificado exitosamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}