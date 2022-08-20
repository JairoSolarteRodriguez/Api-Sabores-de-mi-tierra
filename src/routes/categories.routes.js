import { Router } from 'express'

import { authAdmin } from '../middlewares/authAdmin.js'

import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategoryById, deleteAllCategory } from '../controllers/api/Category.controller.js'

const router = Router()

/*==========Profile Routes=================*/
router.get('/category', getAllCategories)
router.get('/category/:id', getCategoryById)
router.post('/category', createCategory)
router.patch('/category/:id', authAdmin, updateCategory)
router.delete('/category', authAdmin, deleteAllCategory)
router.delete('/category/:id', authAdmin, deleteCategoryById)

export default router
