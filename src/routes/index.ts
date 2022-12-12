import express from 'express'
import mainController from '../controller'
const router= express.Router()

router.post('/read-csv', mainController.post)
export default router