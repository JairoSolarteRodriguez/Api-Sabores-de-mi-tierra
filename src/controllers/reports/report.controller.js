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
      where: { '$users_reported.userReported$': userReported, '$users_reported.userReportActive$': true},
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
    const report = await UserReported.findAll({ where: { userReport: userReport, userReportActive: true} })

    if(report.length === 1) return res.status(400).send({ message: `No puede enviar más reportes a esté usuario, por favor intente luego` })

    if(userReport === userReported) return res.status(400).send({ message: `No se puede reportar usted mismo` })

    const newReport = await UserReported.create({
      userReportedComment: commentReport,
      userReportedDate: date.toISOString(),
      userReported: userReported,
      userReport: userReport
    })

    if(newReport) return res.status(200).send({ message: `Su reporte ha sido enviado exitosamente`, quantityReports: UsersReports.length+1 })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const rejectReport = async (req, res) => {
  const { id } = req.params

  UserReported.update({ userReportActive: false }, {
    where: {
      userReported: id,
      userReportActive: true
    }
  })

  return res.status(200).send({ message: `Todos los reportes fueron rechazados` })
}

export const getActiveReports = async (req, res) => {
  const { id } = req.params

  if(!id) return res.status(400).send({ message: `Por favor enviar un id` })

  const UsersReports = await UserReported.findAll({
    where: { '$users_reported.userReported$': id, '$users_reported.userReportActive$': true }, // get active reports
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

  const user = await User.findOne({ where: { userId : id }})

  if(!UsersReports || UsersReports.length === 0) return res.status(200).send({ message: `No se encontraron reportes activos para el usuario: ${user.userName}` })

  return res.status(200).send(UsersReports)
}

export const deleteByIdReports = async (req, res) => {
  try {
    const { id } = req.params
    const userId = parseInt(id)
  
    const deleted = await UserReported.destroy({
      where: {
        userReported: userId
      }
    })
  
    if(deleted >= 1 ) return res.status(200).send({ message: `Reporte de usuario ${userId} eliminado exitosamente. Se han eliminado ${deleted} reporte(s)` })
      
    if(deleted === 0 ) return res.status(400).send({ message: `El Reporte de usuario ${userId} no fue encontrado` })
    
    return res.status(200).send({ message: deleted })
  } catch (error) {
    return res.status(500).send({message: `Ocurrio un error: ${error}`})
  }
}

export const deleteAllReports = async (req, res) => {
  try {
    const deleted = await UserReported.destroy({ truncate: { cascade: true } })
  
   return res.status(200).send({ message: `Se eliminaron ${deleted} reporte(s)` })
  } catch (error) {
    return res.status(500).send({message: `Ocurrio un error: ${error}`})
  }
}