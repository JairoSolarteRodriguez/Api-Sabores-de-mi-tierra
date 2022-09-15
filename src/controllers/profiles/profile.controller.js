import { UserProfile } from "../../models/UsersProfile.js"
import { User } from "../../models/Users.js"

export const createProfile = async (req, res) => {
  try {
    const {
      profileName,
      profileBirthDate,
      profilePhoto,
      userId,
    } = req.body

    if(!profileName || !userId) return res.status(400).send({ message: `Los campos nombre y usuario son obligatorios`})

    const profile = await UserProfile.findOne({ where: {userId: userId}})

    if(profile) return res.status(400).send({ message: `El usuario ya tiene un perfil asignado` })

    const newProfile = await UserProfile.create({
      profileName,
      profileBirthDate,
      profilePhoto,
      userId
    })

    if(newProfile) return res.status(200).send({ message: `Perfil completado exitosamente` })
  } catch (error) {
    return res.send(500).send({ message: `Algo ocurrio: ${error}` })
  }
}

export const getProfileInfo = async (req, res) => {
  try {
    const { id } = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const profile = await UserProfile.findOne({
      where: { '$users_profile.userId$': id },
      include: [{
        attributes: [
          "userId",
          "userName",
          "userEmail",
          "userIsAdmin",
          "userIsStaff",
          "userIsActive",
          "lastLogin",
          "userRestricted",
          "userBlocked",
          "createdAt",
          "updatedAt",
        ],
        model: User,
      }]
    })

    return res.status(200).send(profile)
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio: ${error}` })
  }
}

export const getAllProfileInfo = async (req, res) => {
  try {

    const profile = await UserProfile.findOne({
      include: [{
        attributes: [
          "userId",
          "userName",
          "userEmail",
          "userIsAdmin",
          "userIsStaff",
          "userIsActive",
          "lastLogin",
          "userRestricted",
          "userBlocked",
          "createdAt",
          "updatedAt",
        ],
        model: User,
      }]
    })

    return res.status(200).send(profile)
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio: ${error}` })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params
    const {
      profileName,
      profileBirthDate,
      profilePhoto,
    } = req.body

    if(!profileName || !profileBirthDate || !profilePhoto) return res.status(400).send({ message: `Los campos son obligatorios`})

    const newProfile = await UserProfile.update({
      profileName,
      profileBirthDate,
      profilePhoto
    }, {where: { userId: id}})

    if(newProfile) return res.status(200).send({ message: `Perfil actualizado` })
  } catch (error) {
    return res.send(500).send({ message: `Algo ocurrio: ${error}` })
  }
}