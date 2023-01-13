import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import { APP_ORIGIN, PORT } from './config/app'

const server = async () => {
  try {
    const server = app.listen(PORT, async () => {
      console.log(
        `✅ Server running on ${APP_ORIGIN} in ${process.env.NODE_ENV} mode`
      )
    })

    process.on('SIGINT', () => {
      server.close(async () => {
        console.log('❌ Server is closed...')
        process.exit(0)
      })
    })

    process.on('SIGTERM', () => {
      server.close(async () => {
        console.log('❌ Server is closed...')
        process.exit(0)
      })
    })
  } catch (err) {
    console.error(err, 'Err, Something went wrong!')
  }
}

server()
