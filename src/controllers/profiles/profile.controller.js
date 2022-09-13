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

    if(!profileName, !userId) return res.status(400).send({ message: `Los campos nombre y usuario son obligatorios`})

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