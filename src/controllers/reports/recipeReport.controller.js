import { Recipes } from "../../models/Recipes.js"
import { RecipesReported } from "../../models/RecipesReported.js"


export const createReport = async (req, res) => {
  try {
    const {
      userId,
      recipeId,
      commentReport
    } = req.body

    if(!recipeId || !userId || !commentReport) return res.status(400).send({ message: `Por fallor llenar todos los campos` })

    const RecipesReports = await RecipesReported.findAll({
      where: { '$recipes_reported.recipeId$': recipeId, '$recipe_reported.recipeReportActive$': true},
      include: [{
        model: Recipes,
      }]
    })

    if(RecipesReports.length >= 10){
      await Recipes.update({ recipe_restricted: true }, {
        where: {
          recipeId: recipeId
        }
      })
    }

    const date = new Date()

    /*
      The user can only send a report, if the administrator or 
      staff rejects the reports then he can send reports again
    */
    const report = await RecipesReported.findAll({ where: { userId: userId, recipeReportActive: true} })

    if(report.length === 1) return res.status(400).send({ message: `No puede enviar más reportes a esta receta, por favor intente luego` })

    const newReport = await RecipesReported.create({
      recipeReportedComment: commentReport,
      recipeReportedDate: date.toISOString(),
      recipeId: recipeId,
      userId: userId
    })

    if(newReport) return res.status(200).send({ message: `Su reporte ha sido enviado exitosamente` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const rejectReport = async (req, res) => {
  const { recipeId } = req.params

  UserReported.update({ recipeReportActive: false }, {
    where: {
      recipeId: recipeId,
      userReportActive: true
    }
  })

  return res.status(200).send({ message: `Todos los reportes fueron rechazados` })
}

export const getActiveReports = async (req, res) => {
  const { recipeId } = req.params

  if(!recipeId) return res.status(400).send({ message: `Por favor enviar un id` })

  const RecipeReports = await RecipesReported.findAll({
    where: { '$recipes_reported.recipeId$': recipeId, '$recipes_reported.recipeReportActive$': true }, // get active reports
    include: [{
      attributes: [
        "recipeId",
        "recipeName",
        "recipePhoto",
        "createdAt",
        "updatedAt",
      ],
      model: Recipes,
    }]
  })

  const recipe = await Recipes.findOne({ where: { recipeId : recipeId }})

  if(!RecipeReports || RecipeReports.length === 0) return res.status(200).send({ message: `No se encontraron reportes activos para la receta: ${recipe.recipeName}` })

  return res.status(200).send(RecipeReports)
}

export const deleteByIdReports = async (req, res) => {
  try {
    const { id } = req.params
    const recipeId = parseInt(id)
  
    const deleted = await UserReported.destroy({
      where: {
        recipeId: recipeId
      }
    })
  
    if(deleted >= 1 ) return res.status(200).send({ message: `Reporte de la receta ${recipeId} eliminado exitosamente. Se han eliminado ${deleted} reporte(s)` })
      
    if(deleted === 0 ) return res.status(400).send({ message: `El Reporte de la receta ${recipeId} no fue encontrado` })
    
    return res.status(200).send({ message: deleted })
  } catch (error) {
    return res.status(500).send({message: `Ocurrio un error: ${error}`})
  }
}

export const deleteAllReports = async (req, res) => {
  try {
    const deleted = await RecipesReported.destroy({ truncate: { cascade: true } })
  
   return res.status(200).send({ message: `Se eliminaron ${deleted} reporte(s)` })
  } catch (error) {
    return res.status(500).send({message: `Ocurrio un error: ${error}`})
  }
}