import chalk from 'chalk'
import app from './app'
import { connectDB } from './config/db'

const server = () => {
  let color: any
  switch (process.env.NODE_ENV) {
    case 'production':
      color = chalk.yellow
      break

    default:
      color = chalk.blue
      break
  }

  try {
    connectDB()

    const server = app.listen(PORT, () => {
      console.log(
        color.bold(
          `✅ Server running on ${APP_ORIGIN} in ${process.env.NODE_ENV} mode`
        )
      )
    })

    mongoose.connection.on('disconnected', () => {
      console.log(chalk.red.bold(`❌ Database Disconnected...`))
    })

    process.on('SIGINT', () => {
      server.close(async () => {
        await mongoose.connection.close(false)
        console.log(chalk.red.bold('❌ Server is closed...'))
        process.exit(0)
      })
    })

    process.on('SIGTERM', () => {
      server.close(async () => {
        await mongoose.connection.close(false)
        console.log(chalk.red.bold('❌ Server is closed...'))
        process.exit(0)
      })
    })
  } catch (err) {
    console.error(chalk.red.bold(err, 'Err, Something went wrong!'))
  }
}

server()
