import mongoose, { ConnectOptions } from 'mongoose'

// const USERNAME = process.env.MONGO_USERNAME
const HOST = process.env.MONGO_HOST
const DATABASE = process.env.MONGO_DATABASE

const MongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}
const MONGO_URI = `mongodb://127.0.0.1:${HOST}/${DATABASE}`
let dbConnection: mongoose.Connection
const connectDB = async (): Promise<any> => {
  console.log(MONGO_URI)
  try {
    const conn = await mongoose.connect(
      MONGO_URI,
      MongoOptions as ConnectOptions
    )
    console.log(
     (`✅ Database Connected: ${conn.connection.host}`)
    )
    dbConnection = conn.connection
    return conn
  } catch (error) {
    console.error((`Error: ${error.message}`))
    process.exit(1)
  }
}

export { connectDB, dbConnection }
