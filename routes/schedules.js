const express = require('express')
const router = express.Router()
const { get, createMany, create, update, remove } = require('../controllers/schedules')
const { protect } = require('../middleware/auth')

router.route('/').get(get)


router.route('/createMany').post(protect, createMany)

router.route('/create').post(create)

router.route('/:id').put(update)

router.route('/remove/:id').delete(remove)

module.exports = router
