'use strict'
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

	lastName: String,
	firstName: String,
	password: String,
	phone: String,
	domain: String,
	file: String,
	contactText: mongoose.Schema.Types.Mixed,
	descText: mongoose.Schema.Types.Mixed,
	retail: mongoose.Schema.Types.Mixed,
	params: mongoose.Schema.Types.Mixed,
	email: {
		type: String,
		lowercase: true,
		unique: true
	},
	social: {
		type: mongoose.Schema.Types.Mixed
	},
	image: {
		type: String,
		'default': 'img/avatar_defaut.png'
	},
	content: [{
		type: mongoose.Schema.Types.Mixed,
		ref: 'Content'
	}]
}, {
	timestamps: true
})

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('User', userSchema)
