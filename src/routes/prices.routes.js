import { Router } from 'express'

import { authAdmin } from '../middlewares/authAdmin.js'

import { getAllPrices, getPriceById, createPrices, updatePrice, deleteAllPrices, deletePriceById } from '../controllers/api/Price.controller.js'

const router = Router()

/*==========Prices Routes=================*/
router.get('/price', getAllPrices)
router.get('/price/:id', getPriceById)
router.post('/price', createPrices)
router.patch('/price/:id', authAdmin, updatePrice)
router.delete('/price', authAdmin, deleteAllPrices)
router.delete('/price/:id', authAdmin, deletePriceById)

export default router
