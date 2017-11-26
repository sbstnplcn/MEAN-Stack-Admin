'use strict'
const Controller = require('./Controller')
const formidable = require('formidable')
const fs = require('fs')
const cloudinary = require('cloudinary')
const ENV = require('../../config/env')

const CONTENT = require('../models/content')
const USER = require('../models/user')


class ContentController extends Controller {
	constructor() {
		super(CONTENT)
	}

	upload(req, res, next) {

		// parse a file upload
		const form = new formidable.IncomingForm()
		form.uploadDir = './tmp/'
		if (!fs.existsSync(form.uploadDir)) fs.mkdirSync(form.uploadDir)

		form.parse(req, (err, fields, files) => {
			const name = form.uploadDir + files.image.name
			fs.rename(files.image.path, name)
			return cloudinaryUpload(name)
		})
		function cloudinaryUpload(name) {
			cloudinary.config({
				cloud_name: ENV.CLOUDINARY.NAME,
				api_key: ENV.CLOUDINARY.KEY,
				api_secret: ENV.CLOUDINARY.SECRET
			})

			cloudinary.v2.uploader.upload(
				name,
				{
					quality: 'auto:good',
					height: 600,
					crop: 'scale'
				}, (error, result) => {
					if (error) throw error
					else {
						console.log(result)
						res.status(200).send(result)
					}
				}
			)
		}

	}

	create(req, res, next) {
		const content = req.body
		content._id = content.title.toLowerCase().split(' ').join('-')
		this.model.create(content, (err, document) => {
			if (err) throw err
			else {
				res.json(document)
				USER.findById(document.userId).then((user) => {
					user.content.push(document._id)
					return USER.update({_id: user._id}, user)
				})
			}
		})
	}

	update(req, res, next) {
		const content = req.body
		const newId = content.title.toLowerCase().split(' ').join('-')
		const oldId = req.params.id
		if (oldId !== newId) {
			content._id = newId
			this.model.create(content, (err, newContent) => {
				if (err) next(err)
				else {
					return this.model.findByIdAndRemove(oldId, (er) => {
						if (er) throw er
						else {
							return USER.findById(content.userId).then((user) => {
								user.content.push(newContent._id)
								const idx = user.content.indexOf(oldId)
								user.content.splice(idx, 1)
								return USER.update({
									_id: user._id
								}, {content: user.content}).then(() => {
									res.status(200).json(newContent)
								}).catch((error) => {
									throw error
								})
							})
						}
					})
				}
			})
		} else {
			this.model.update({
				_id: req.params.id
			}, req.body, (err, document) => {
				if (err) next(err)
				else res.sendStatus(200)
			})
		}
	}

	findOne(req, res, next) {
		const search = new RegExp(`(${ req.params.recherche })`, 'igm')
		this.model.find({
			$or: [{
				serie: search
			}]
		}, (err, contents) => {
			if (err) next(err)
			else res.json(contents)
		})
	}

	delete(req, res, next) {
		this.model.findById(req.params.id, (err, document) => {
			USER.findById(document.userId).then((user) => {
				const idx = user.content.indexOf(req.params.id)
				user.content.splice(idx, 1)
				USER.update({_id: user._id}, user).then(() => {
					this.model.findByIdAndRemove(req.params.id, (err) => {
						res.sendStatus(200)
					})
				})
			})
		})
	}
}
module.exports = ContentController
