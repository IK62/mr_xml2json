const express = require('express')
const { createLabel, searchRelay } = require('./relay.controller')

const router = express.Router()

router.route('/createLabel').post(createLabel)
router.route('/searchRelay').post(searchRelay)

module.exports = router