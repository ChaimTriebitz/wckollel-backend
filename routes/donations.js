const express = require('express')
const router = express.Router()
const { donate, } = require('../controllers/donations.js')
const { protect } = require('../middleware/auth.js')


router.route('/donate').post(donate)

module.exports = router
