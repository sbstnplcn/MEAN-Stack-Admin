'use strict'

const EventEmitter = require('events')

const ee = new EventEmitter()

ee.setMaxListeners(20)

module.exports = ee
