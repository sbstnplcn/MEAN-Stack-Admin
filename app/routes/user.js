'use strict'
const UsersController = require('../controllers/UsersController')
const auth = require('../middlewares/authorization')

module.exports = (app) => {
	// Create new controller
	const usersCtrl = new UsersController()

	app.get('/users', auth.user.isAuthenticate, (req, res, next) => usersCtrl.find(req, res, next))

	app.get('/users/:id', auth.user.isAuthenticate, (req, res, next) => usersCtrl.findById(req, res, next))

	app.get('/users/populate/:id', auth.user.isAuthenticate, (req, res, next) => usersCtrl.findByIdAndPopulate(req, res, next))

	app.get('/syncData/:id', auth.user.isAuthenticate, (req, res, next) => usersCtrl.syncData(req, res, next))

	app.post('/users', (req, res, next) => usersCtrl.create(req, res, next))

	// send email
	app.post('/message/send', auth.user.isAuthenticate, (req, res, next) => usersCtrl.email(req, res, next))

	//  Auth
	app.post('/connect', usersCtrl.connect)

	app.get('/users/resetPassword', (req, res, next) => usersCtrl.resetPassword(req, res, next))

	app.put('/users/:id', auth.user.isAuthenticate, (req, res, next) => usersCtrl.update(req, res, next))

	app.delete('/users/:id', auth.user.isAuthenticate, (req, res, next) => usersCtrl.delete(req, res, next))

}
