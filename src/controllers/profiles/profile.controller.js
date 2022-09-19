import { UserProfile } from "../../models/UsersProfile.js";
import { User } from "../../models/Users.js";
import { sequelize } from "../../db/db.js";

export const createProfile = async (req, res) => {
  try {
    const { profileName, profileBirthDate, profilePhoto, userId, description } =
      req.body;

    if (!profileName || !userId)
      return res
        .status(400)
        .send({ message: `Los campos nombre y usuario son obligatorios` });

    const profile = await UserProfile.findOne({ where: { userId: userId } });

    if (profile)
      return res
        .status(400)
        .send({ message: `El usuario ya tiene un perfil asignado` });

    const newProfile = await UserProfile.create({
      profileName,
      profileBirthDate,
      profilePhoto,
      userId,
      description,
    });

    if (newProfile)
      return res
        .status(200)
        .send({ message: `Perfil completado exitosamente` });
  } catch (error) {
    return res.send(500).send({ message: `Algo ocurrio: ${error}` });
  }
};

export const getProfileInfo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: `Por favor enviar un id` });

    const profile = await UserProfile.findOne({
      where: { "$users_profile.userId$": id },
      include: [
        {
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
          where: { "$user.userIsActive$": true },
        },
      ],
    });

    if (!profile || profile.length === 0)
      return res
        .status(400)
        .send({ message: `El usuario que busca no se encuentra` });

    return res.status(200).send(profile);
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio: ${error}` });
  }
};

export const getAllProfileInfo = async (req, res) => {
  try {

    const profile = await UserProfile.findAll({
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
        // where: { "$user.userIsActive$": true }
      }]
    })

    return res.status(200).send(profile);
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio: ${error}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params
    const {
      profileName,
      profileBirthDate,
      profilePhoto,
      profileDescription,
    } = req.body

    if(!profileName || !profileBirthDate || !profilePhoto || !profileDescription) return res.status(400).send({ message: `Los campos son obligatorios`})

    const newProfile = await UserProfile.update({
      profileName,
      profileBirthDate,
      profilePhoto,
      userDescription: profileDescription
    }, {where: { userId: id}})

    if (newProfile)
      return res.status(200).send({ message: `Perfil actualizado` });
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio: ${error}` })
  }
};

export const getRecipesProfile = async (req, res) => {
  const { id } = req.params;
  let { page, limit } = req.query;

  try {
    parseInt(limit);
    parseInt(page);
  } catch (error) {
    return error;
  }

  !limit ? (limit = 5) : limit;
  !page ? (page = 1) : page;

  try {
    const [recipes] = await sequelize.query(`
    SELECT r."userId", r."recipeId", r."recipeName", d."dificultName", p."priceSufix", r."recipePhoto", r."recipePortions", 
    r."recipeTime", r."recipeDescription", r."recipePrivacity", r."createdAt"
    FROM recipes r
    JOIN prices p ON p."priceId" = r."priceId" 
    JOIN dificults d ON d."dificultId" = r."recipeDificult"
    WHERE r."userId" = ${id}
    `);

    return res
      .status(200)
      .send(recipes.slice(page === 1 ? 0 : limit * (page - 1), limit * page));
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` });
  }
};
