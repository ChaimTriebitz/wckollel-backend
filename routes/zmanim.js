const express = require('express')
const router = express.Router()
const { get } = require('../controllers/zmanim.js')

router.route('/').get(get)

module.exports = router