'use strict'

module.exports = {
	DB: process.env.MONGODB_URI,
	SECRET_TOKEN: process.env.SECRET_TOKEN,
	NODEMAILER: {
		GMAIL: {
			USER: process.env.NODEMAILER_USER,
			MAIL: process.env.NODEMAILER_MAIL,
			PASSWORD: process.env.NODEMAILER_PASSWORD
		}
	},
	CLOUDINARY: {
		NAME: process.env.CLOUDINARY_NAME,
		KEY: process.env.CLOUDINARY_KEY,
		SECRET: process.env.CLOUDINARY_SECRET
	}
}
