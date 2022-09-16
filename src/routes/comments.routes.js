import { Router } from 'express'

// import { authAdmin } from '../middlewares/authAdmin.js'

import { getCommentsByRecipeId, createComment, updateComment, deleteComment } from '../controllers/comments/comments.controller.js'

const router = Router()

/*==========Comments Routes=================*/
router.get('/comments/:recipe_id', getCommentsByRecipeId)
router.post('/comments', createComment)
router.patch('/comments/:comment_id', updateComment)
router.delete('/comments/:comment_id', deleteComment)

export default router
