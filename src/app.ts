import express, { Application } from 'express'
import Router from './routes'
import morgan from 'morgan'
import { errorHandler, notFound } from './middlewares/error_handler'
import cors from 'cors'

const app: Application = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(morgan('dev'))
app.use(Router)
app.use(notFound, errorHandler)

export default app
