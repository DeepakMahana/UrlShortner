const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const log = require('./util/log')

// Load env from file for dev. Set NODE_ENV in your bashrc or zshrc.
if (process.env.NODE_ENV != 'production') {
  require('env2')('./devenv.json')
}

// Connect to MongoDB
require('./sys/mongo');

const app = express()

// Middlewares
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

// Routers
const urlshort = require('./route/urlshort')
app.use('/api', urlshort)

const port = process.env.SERVICE_PORT || 3000
const server = http.createServer(app)
server.listen(port, () => {
  log(`REST serving on port ${port}`.green.bold)
})