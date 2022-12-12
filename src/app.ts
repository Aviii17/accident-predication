import express, { Application } from "express"
import Router from './routes'
import morgan from 'morgan'
const app: Application = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(Router)


export default app
