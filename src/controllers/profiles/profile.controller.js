import { UserProfile } from "../../models/UsersProfile.js"
import { User } from "../../models/Users.js"

export const createProfile = async (req, res) => {
  try {
    const {
      profile_stars,
      profile_name,
      profile_birth_date,
      profile_photo,
      user_id,
    } = req.body

    console.log({profile_stars,
      profile_name,
      profile_birth_date,
      profile_photo,
      user_id})

    if(!profile_name, !user_id) return res.status(400).send({ message: `Los campos nombre y usuario son obligatorios`})

    const profile = await UserProfile.findOne({ where: {user_id: user_id}})

    if(profile) return res.status(400).send({ message: `El usuario ya tiene un perfil asignado` })

    const newProfile = await UserProfile.create({
      profile_stars,
      profile_name,
      profile_birth_date,
      profile_photo,
      user_id
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
      where: { '$users_profile.user_id$': id }, // get active reports
      include: [{
        attributes: [
          "user_id",
          "username",
          "user_email",
          "user_is_admin",
          "user_is_staff",
          "user_is_active",
          "last_login",
          "user_restricted",
          "user_blocked",
          "createdAt",
          "updatedAt",
        ],
        model: User,
      }]
    })

    console.log(profile)

    return res.status(200).send(profile)
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio: ${error}` })
  }
}