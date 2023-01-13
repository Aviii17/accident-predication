import express from 'express'
import mainController from '../controller'
import multer from 'multer'
import path from 'path'

const filePath = path.resolve(__dirname, '../asset/')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, filePath)
  },
  filename: (_req, file, cb) => {
    const filename = 'data' + path.extname(file.originalname).toLowerCase()
    cb(null, filename)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    const filetypes = /csv/
    filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (filetypes && mimetype) {
      return cb(null, true)
    }
    cb(new Error('Invalid file, allowed only .csv format files'))
  },
})

const router = express.Router()

router.get('/accidents', mainController.search)
router.get('/accidents/:id', mainController.singleAccident)
router.post('/csv/upload', upload.single('csv'), mainController.uploadCsv)
router.get('/csv/check', mainController.hasCSV)

export default router
