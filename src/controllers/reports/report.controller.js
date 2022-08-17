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
      where: { '$users_reported.user_reported$': userReported},
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

    // TODO: fix sending mass reports to a user
    const report = await UserReported.findAll({ where: { user_report: userReport} })
    
    // if(report && report.user_report_active && report.user_report === parseInt(userReport)) return res.status(400).send({ message: `No puede enviar más reportes a esté usuario, por favor intente luego` })
    // console.log(report.user_report_active, userReport)

    if(userReport === userReported) return res.status(400).send({ message: `No se puede reportar usted mismo` })

    const newReport = await UserReported.create({
      user_reported_comment: commentReport,
      user_reported_date: date.toISOString(),
      user_reported: userReported,
      user_report: userReport
    })

    if(newReport) return res.status(200).send({ message: `Su reporte ha sido enviado exitosamente`, quantityReports: UsersReports.length })
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