// Handle environment variables

require('dotenv').config()
const process = require('process')

const PORT = process.env.PORT
const url = process.env.mongoUrl

module.exports = {
    PORT, 
    url
}