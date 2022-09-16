import { sequelize } from '../../db/db.js'
import { Comments } from '../../models/Comments.js'
import { CommentsRecipe } from '../../models/CommentsRecipes.js'

export const getCommentsByRecipeId = async (req, res) => {
  try {
    const { recipe_id } = req.params

    if(!recipe_id) return res.status(400).send({ message: `Debe seleccionar una receta` })

    const [ comments ] = await sequelize.query(`
      SELECT u."userName", up."profilePhoto", up."score", c."commentId", cr."recipeRecipeId" "recipeId", c."commentText", c."commentPhoto", c."createdAt", c."updatedAt" FROM comment_recipes cr
      JOIN comments c ON cr."commentCommentId" = c."commentId"
      JOIN users u ON cr."userUserId" = u."userId"
      JOIN users_profiles up ON u."userId" = up."userId"
      WHERE cr."recipeRecipeId" = ${recipe_id}
    `)

    if(comments.length === 0) return res.status(400).send({ message: `Aún no hay comentarios aquí` })

    return res.status(200).send(comments)
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const createComment = async (req, res) => {
  try {
    const { 
      commentText,
      commentPhoto,
    } = req.body

    const {
      recipeId,
      userId,
    } = req.body

    if(!commentText || !recipeId || !userId) return res.status(400).send({ message: `Rellenar todos los campos por favor` })

    const comment = await Comments.create({
      commentText,
      commentPhoto
    })

    const commentRecipe = await CommentsRecipe.create({
      recipeRecipeId: recipeId,
      userUserId: userId,
      commentCommentId: comment.commentId
    })

    return res.status(200).send({ message: `Comentario realizado`, data: commentRecipe })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error ${error}` })
  }
}

export const updateComment = async (req, res) => { // image and comment text
  try {
    const {
      commentText,
      commentPhoto,
    } = req.body

    const { comment_id } = req.params

    const comment = await Comments.update({commentText, commentPhoto}, {
      where: { commentId: comment_id}
    })

    if(comment[0] === 0) return res.status(400).send({ message: `No se ecuentra el commentario con el id: ${comment_id}` })

    if(comment[0] >= 1) return res.status(200).send({ message: `Se ha actualizado el comentario` })
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}

export const deleteComment = async (req, res) => { 
  try {
    const { comment_id } = req.params

    const commentRecipe = await CommentsRecipe.destroy({ where: { commentCommentId: comment_id } })
    const comment = await Comments.destroy({ where: { commentId: comment_id } })

    if(comment === 0 && commentRecipe === 0) return res.status(200).send({ message: `No se ecuentra el comentario con el id: ${id}`, commentRecipe })

    if(comment === 1 && commentRecipe >= 1) return res.status(200).send({ message: `El comentario se ha eliminado correctamente`, commentRecipe })

  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
  }
}