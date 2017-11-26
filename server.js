'use strict'
const http = require('http')
const express = require('express')
const app = exports.app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const routes = require('./app/routes')
const ENV = require('./config/env')
const port = process.env.PORT || 8000
const cors = require('cors')

app.use(express.static(`${ __dirname }/public`))

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}))

app.use(methodOverride('X-HTTP-Method-Override'))

app.use(cors())

app.use('/api', routes())

app.all('/*', (req, res) => res.sendFile('index.html', {root: `${ __dirname }/public`}))

const server = http.Server(app)

server.listen(port)
console.log(`server listening on port ${ port }`)

process.on('SIGINT', () => {
	console.log('\nStopping...')
	process.exit()
})

const mongoose = require('mongoose')
mongoose.connect(ENV.DB)

app.use((error, request, response, next) => {

	console.error(error.stack)
	response.status(500).send(error.message)
})
