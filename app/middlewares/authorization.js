'use strict'
const jwt = require('jsonwebtoken')
const ENV = require('../../config/env')

exports.user = {

	isAuthenticate(req, res, next) {
		if (req.headers.authorization || (req.headers.cookie && req.headers.cookie.indexOf('token=') > -1)) {
			const token = req.headers.authorization || req.headers.cookie.split('token=')[1]
			jwt.verify(token, ENV.SECRET_TOKEN, (err, decoded) => {
				if (err)
					return res.sendStatus(403)
				else
					next()
			})
		} else {
			return res.sendStatus(403)
		}
	},

	getDecoded(req) {
		return new Promise((resolve, reject) => {
			if (req.headers.authorization || (req.headers.cookie && req.headers.cookie.indexOf('token=') > -1)) {
				const token = req.headers.authorization || req.headers.cookie.split('token=')[1]
				jwt.verify(token, ENV.SECRET_TOKEN, (err, decoded) => {
					if (err)
						reject()
					else
						resolve(decoded._doc)
				})
			} else {
				reject()
			}
		})
	}
}
