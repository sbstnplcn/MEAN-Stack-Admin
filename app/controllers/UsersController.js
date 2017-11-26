'use strict'
const jwt = require('jsonwebtoken')
const Controller = require('./Controller')
const generator = require('generate-password')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/authorization')
const ee = require('../middlewares/ee')
const fs = require('fs')
const cloudinary = require('cloudinary')

const USER = require('../models/user')
const ENV = require('../../config/env')


class UsersController extends Controller {

	constructor() {
		super(USER)
	}

	create(req, res, next) {
		const user = req.body

		user.password = bcrypt.hashSync(user.password, 10)

		this.model.create(req.body, (err, user) => {
			if (err) next(err)
			else {
				console.log(user)
				res.status(201).send(user)
			}
		})
	}


	connect(req, res, next) {
		if (!req.body.email || !req.body.password) {
			res.status(400).send('Veuillez saisir votre email et votre mot de passe')
		} else {
			const include = '_id content email firstname domain password'
			USER.findOne({
				email: req.body.email
			}, include, (err, user) => {
				if (err)
					next(err)
				else if (!user)
					res.status(404).send('Utilisateur non trouvé')
				else if (!bcrypt.compareSync(req.body.password, user.password))
					res.status(403).send('Le mot de passe ne correspond pas')
				else {
					const token = jwt.sign(user, ENV.SECRET_TOKEN, {
						expiresIn: '24h'
					})
					// return the information including token as JSON
					res.json({
						success: true,
						user,
						token
					})
				}
			})
		}
	}

	update(req, res, next) {
		auth.user.getDecoded(req).then((user) => {
			if (user._id === req.params.id) {
				if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10)
				this.model.update({
					_id: req.params.id
				}, req.body, (err, document) => {
					if (err) {
						next(err)
					} else {
						res.sendStatus(200)
					}
				})
			} else {
				res.sendStatus(403)
			}
		}).catch((err) => {
			res.sendStatus(500)
		})

	}

	find(req, res, next) {
		this.model.find({}, '-password').exec((err, users) => {
			res.json(users)
		})
	}

	findById(req, res, next) {
		this.model.findById(req.params.id, '-password').exec((err, user) => {
			res.json(user)
		})
	}

	findByIdAndPopulate(req, res, next) {
		this.model.findById(req.params.id, '-password')
		.populate({
			path: 'content'
		})
		.exec((err, user) => {
			res.json(user)
		})
	}

	resetPassword(req, res, next) {
		const newPassword = generator.generate({
			length: 10,
			numbers: true
		})
		this.model.findOneAndUpdate({
			email: req.body.email
		}, {
			$set: {
				password: bcrypt.hashSync(newPassword, 10)
			}
		}, (err, user) => {
			if (err) next(err)
			else if (!user) {
				// Renvoyer un message à l'utilisateur pour lui dire que son mail est incorrect
				res.status(404).send('Utilisateur non trouvé')
			} else {
				user.password = newPassword
				ee.emit('newuser', user)
				res.sendStatus(200)
			}

		})
	}

	syncData(req, res, next) {
		const ignoreUser = '-password -createdAt -email -updatedAt -_id'
		const ignoreContent = '-createdAt -userId -updatedAt'
		this.model
		.findById(req.params.id, ignoreUser)
		.populate({
			path: 'content',
			select: ignoreContent,
			match: {
				active: true
			}
		})
		.exec((err, user) => {
			fs.writeFile(`./tmp/${ user.domain }.txt`, JSON.stringify(user), 'utf8', (err) => {
				if (err) throw err
				else {
					cloudinary.config({
						cloud_name: ENV.CLOUDINARY.NAME,
						api_key: ENV.CLOUDINARY.KEY,
						api_secret: ENV.CLOUDINARY.SECRET
					})
					cloudinary.v2.uploader.upload(
						`./tmp/${ user.domain }.txt`,
						{
							public_id: `${ user.domain }.txt`,
							invalidate: true,
							resource_type: 'auto'
						}, (err, result) => {
							if (err) throw err
							else {
								// res.status(200).send(result)
								this.model.update({
									_id: req.params.id
								}, {file: result.secure_url}, (err, document) => {
									if (err) {
										next(err)
									} else {
										res.status(200).send(result)
									}
								})
							}
						}
					)
				}
			})
		})
	}

}

module.exports = UsersController
