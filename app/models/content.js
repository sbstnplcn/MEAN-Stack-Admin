'use strict'
const mongoose = require('mongoose')
const contentSchema = new mongoose.Schema({

	_id: {
		type: String,
		lowercase: true,
		unique: true
	},
	userId: String,
	title: String,
	description: String,
	img: String,
	active: {
		type: Boolean,
		'default': false
	},
	works: mongoose.Schema.Types.Mixed
}, {
	timestamps: true
})

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('Content', contentSchema)
