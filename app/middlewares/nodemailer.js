'use strict'
const ENV = require('../../config/env')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const ee = require('./ee')

const transporter = nodemailer.createTransport(smtpTransport({
	service: 'Gmail',
	auth: {
		user: ENV.NODEMAILER.GMAIL.EMAIL,
		pass: ENV.NODEMAILER.GMAIL.PASSWORD
	}
}))

const mailOptions = {
	from: `"${ ENV.NODEMAILER.GMAIL.USER }" <${ ENV.NODEMAILER.GMAIL.EMAIL }>`,
	to: '',
	subject: 'Nouveau mot de passe',
	text: '',
	html: ''
}


ee.on('newuser', (user) => {
	mailOptions.to = user.email
	mailOptions.text = `Bonjour ${ user.firstName }, \nVoici votre nouveau de mot de passe : ${ user.password } \n\n Connectez vous avec celui-ci puis pensez à le changer dans votre profil. \n\n ${ ENV.NODEMAILER.GMAIL.USER }`

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return error
		console.log('Message %s sent: %s', info.messageId, info.response)
	})
})
