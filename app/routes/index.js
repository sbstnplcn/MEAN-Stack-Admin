'use strict'
const express = require('express')
const fs = require('fs')

module.exports = (app) => {
	const ROUTER = express.Router()

	fs.readdir('./app/routes', (err, files) => {
		if (err) throw err
		else {
			files.forEach((file) => {
				const controller = file.substr(0, file.lastIndexOf('.'))
				if (controller !== 'index') require(`./${ controller }`)(ROUTER)
			})
		}
	})

	return ROUTER
}
