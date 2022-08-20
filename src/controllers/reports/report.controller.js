import { User } from '../../models/Users.js';
import { UserReported } from '../../models/UsersReported.js'

export const createReport = async (req, res) => {
  try {
    const {
      userReported,
      userReport,
      commentReport
    } = req.body

    if(!userReport || !userReported || !commentReport) return res.status(400).send({ message: `Por fallor llenar todos los campos` })

    const UsersReports = await UserReported.findAll({
      where: { '$users_reported.user_reported$': userReported, '$users_reported.user_report_active$': true},
      include: [{
        model: User,
      }]
    })

    if(UsersReports.length >= 10){
      await User.update({ user_restricted: true }, {
        where: {
          user_id: userReported
        }
      })
    }

    const date = new Date()

    /*
      The user can only send a report, if the administrator or 
      staff rejects the reports then he can send reports again
    */
    const report = await UserReported.findAll({ where: { user_report: userReport, user_report_active: true} })

    if(report.length === 1) return res.status(400).send({ message: `No puede enviar más reportes a esté usuario, por favor intente luego` })

    if(userReport === userReported) return res.status(400).send({ message: `No se puede reportar usted mismo` })

    const newReport = await UserReported.create({
      user_reported_comment: commentReport,
      user_reported_date: date.toISOString(),
      user_reported: userReported,
      user_report: userReport
    })

    if(newReport) return res.status(200).send({ message: `Su reporte ha sido enviado exitosamente`, quantityReports: UsersReports.length+1 })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const rejectReport = async (req, res) => {
  const { id } = req.params

  UserReported.update({ user_report_active: false }, {
    where: {
      user_reported: id,
      user_report_active: true
    }
  })

  return res.status(200).send({ message: `Todos los reportes fueron rechazados` })
}

export const getActiveReports = async (req, res) => {
  const { id } = req.params

  if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

  const UsersReports = await UserReported.findAll({
    where: { '$users_reported.user_reported$': id, '$users_reported.user_report_active$': true }, // get active reports
    include: [{
      model: User,
    }]
  })

  const user = await User.findOne({ where: { user_id : id }})

  if(!UsersReports || UsersReports.length === 0) return res.status(200).send({ message: `No se encontraron reportes activos para el usuario: ${user.username}` })

  return res.status(200).send(UsersReports)
}

export const deleteByIdReports = async (req, res) => {
  try {
    const { id } = req.params
    const userId = parseInt(id)
  
    const deleted = await UserReported.destroy({
      where: {
        user_reported: userId
      }
    })
  
    if(deleted === 1 ) return res.status(200).send({ message: `Reporte de usuario ${userId} eliminado exitosamente` })
      
    if(deleted === 0 ) return res.status(400).send({ message: `El Reporte de usuario ${userId} no fue encontrado` })
    
    return res.status(200).send({ message: deleted })
  } catch (error) {
    return res.status(500).send({message: `Ocurrio un error: ${error}`})
  }
}

export const deleteAllReports = async (req, res) => {
  try {
    const deleted = await UserReported.destroy({ truncate: true })
  
    if(deleted) return res.status(200).send({ message: `Todos lo reportes Eliminados correctamente` })

    return res.status(200).send({ message: deleted })
  } catch (error) {
    return res.status(500).send({message: `Ocurrio un error: ${error}`})
  }
}