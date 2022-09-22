import { AppFeedbacks } from '../../models/AppFeedbacks.js'
// import { User } from '../../models/Users.js'
import { sequelize } from '../../db/db.js'

export const getFeedback = async (req, res) => {
  try {

    const [ feedbacks ] = await sequelize.query(`
      SELECT af."appFeedBackId", af."appFeedbackComment", af."stars", af."createdAt",  u."userId", u."userEmail", u."userName", up."profilePhoto", up."score" "userScore" FROM app_feedbacks af
      JOIN users u ON af."userId" = u."userId"
      JOIN users_profiles up ON u."userId" = up."userId"
    `)

    if(feedbacks) return res.status(200).send( feedbacks )
    
    if(!feedbacks) return res.status(200).send({ message: `Aún no hay calificaciones para la app` })
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` })
  }
}

export const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un Id` })

    const [ feedbacks ] = await sequelize.query(`
      SELECT af."appFeedBackId", af."appFeedbackComment", af."stars", af."createdAt",  u."userId", u."userEmail", u."userName", up."profilePhoto", up."score" "userScore" FROM app_feedbacks af
      JOIN users u ON af."userId" = u."userId"
      JOIN users_profiles up ON u."userId" = up."userId"
      WHERE af."appFeedBackId" = ${id}
    `)
    
    if(feedbacks) return res.status(200).send( feedbacks )

    if(!feedbacks) return res.status(400).send({ message: `No se encuentran calificaciones con el id: ${id}` })
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` })
  }
}

export const addFeedback = async (req, res) => {
  try {
    const {
      appFeedbackComment,
      stars,
      userId
    } = req.body

    if(!appFeedbackComment || !stars || !userId) return res.status(400).send({ message: `Por favor rellenar todos los campos` })

    const existFeedback = await AppFeedbacks.findOne({ where: { userId: userId }})

    if(existFeedback) return res.status(200).send({ message: `No puede agregar más calificaciones a la aplicacion, si desea puede modificar su calificación anterior` })
    
    const newFeedback = await AppFeedbacks.create({
      appFeedbackComment,
      stars,
      userId
    })

    if(newFeedback) return res.status(200).send({ message: `Se ha enviado tu calificación de ${stars} estrellas` })
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` })
  }
}

export const deleteFeedbackById = async (req, res) => {
  try {
    const { id } = req.params

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const feedback = await AppFeedbacks.destroy({
      where: {
        appFeedBackId: id
      }
    })

    if(feedback === 0) return res.status(200).send({ message: `No se ecuentra la calificacion con el id: ${id}` })

    if(feedback >= 1) return res.status(200).send({ message: `Se ha eliminado tu calificación` })
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` })
  }
}

export const updateFeedback = async (req, res) => {
  try {
    const { id }  = req.params
    const { 
      feedbackComment,
      stars
    } = req.body

    if(!feedbackComment || !stars) return res.status(400).send({ message: `Por favor rellenar todos los campos` })

    if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

    const feedback = await AppFeedbacks.update({ appFeedbackComment: feedbackComment, stars }, {
      where: {
        appFeedBackId: id
      }
    })

    if(feedback[0] === 0) return res.status(200).send({ message: `No se encuentra la calificacion con id ${id}` })

    if(feedback[0] >= 1) return res.status(200).send(feedback)
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` })
  }
}

export const getScoreApp = async (req, res) => {
  const [ score ] = await sequelize.query(`
    SELECT AVG(af."appFeedBackId")  FROM app_feedbacks af
  `)

  const [ totalFeedbacks ] = await sequelize.query(`
    SELECT COUNT(af."appFeedBackId")  FROM app_feedbacks af
  `)

  const [ stars ] = await sequelize.query(`
    SELECT COUNT(stars) quantity, ROUND(stars) stars FROM app_feedbacks GROUP BY  ROUND(stars) ORDER BY stars DESC
  `)

  let totalScore = score.map((elm) => parseFloat(elm.avg))
  let quantity = totalFeedbacks.map((elm) => parseInt(elm.count))

  return res.status(200).send({
    qualification: totalScore,
    quantity,
    stars
  })
}