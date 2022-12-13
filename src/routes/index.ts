import express from 'express'
import mainController from '../controller'
const router = express.Router()

router.get('/accidents', mainController.search)
router.get('/accidents/:id', mainController.singleAccident)

export default router
