const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo connected: ${connect.connection.host}`.cyan.underline)
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB;