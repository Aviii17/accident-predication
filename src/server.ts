import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import app from './app'
import { APP_ORIGIN, PORT } from './config/app'
import { connectDB } from './config/db'
import { csvImport } from './helper/csvImport'

const server = async() => {
 
  try {
    connectDB()

    const server =  app.listen(PORT,async() => {
      console.log(
        
          `✅ Server running on ${APP_ORIGIN} in ${process.env.NODE_ENV} mode`
        
      )
      await csvImport()
    })

    mongoose.connection.on('disconnected', () => {
     console.log((`❌ Database Disconnected...`))
    })

    process.on('SIGINT', () => {
      server.close(async () => {
        await mongoose.connection.close(false)
         console.log(('❌ Server is closed...'))
        process.exit(0)
      })
    })

    process.on('SIGTERM', () => {
      server.close(async () => {
        await mongoose.connection.close(false)
         console.log(('❌ Server is closed...'))
        process.exit(0)
      })
    })
  } catch (err) {
     console.error(err, 'Err, Something went wrong!')
  }
}

server()
