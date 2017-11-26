'use strict'

const ContentsController = require('../controllers/ContentsController')
const auth = require('../middlewares/authorization')

module.exports = (app) => {
	// Create new controller
	const ctrl = new ContentsController()

	app.get('/contents', auth.user.isAuthenticate, (req, res, next) => ctrl.find(req, res, next))

	app.get('/contents/:id', auth.user.isAuthenticate, (req, res, next) => ctrl.findById(req, res, next))

	app.post('/contents', (req, res, next) => ctrl.create(req, res, next))

	app.put('/contents/:id', auth.user.isAuthenticate, (req, res, next) => ctrl.update(req, res, next))

	app.delete('/contents/:id', auth.user.isAuthenticate, (req, res, next) => ctrl.delete(req, res, next))

	app.post('/upload', auth.user.isAuthenticate, (req, res, next) => ctrl.upload(req, res, next))

	app.get('/search/:recherche', auth.user.isAuthenticate, (req, res, next) => ctrl.findOne(req, res, next))
}
