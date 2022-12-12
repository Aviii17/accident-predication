import chalk from 'chalk'
import mongoose, { ConnectOptions } from 'mongoose'

const USERNAME = process.env.MONGO_USERNAME
const HOST = process.env.MONGO_HOST
const DATABASE = process.env.MONGO_DATABASE

const MongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}
const MONGO_URI = `mongodb://${USERNAME}:${HOST}/${DATABASE}?retryWrites=true&w=majority`

let dbConnection: mongoose.Connection
const connectDB = async (): Promise<any> => {
  try {
    const conn = await mongoose.connect(
      MONGO_URI,
      MongoOptions as ConnectOptions
    )
    console.log(
      chalk.blue.bold(`✅ Database Connected: ${conn.connection.host}`)
    )
    dbConnection = conn.connection
    return conn
  } catch (error) {
    console.error(chalk.red.bold(`Error: ${error.message}`))
    process.exit(1)
  }
}

export { connectDB, dbConnection }
