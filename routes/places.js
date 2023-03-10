const express = require('express')
//const router = require('./users')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Place = require('../models/shops')
const places = require('../controllers/places')

const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })

const { isLoggedIn, isAuthor, validatePlace } = require('../middlewear')


router.route('/')
    .get(catchAsync(places.index))
    .post(isLoggedIn, upload.array('image'), validatePlace, catchAsync(places.createPlace));

router.get('/new', isLoggedIn, places.renderNewForm)

router.route('/:id')
    .get(catchAsync(places.showPlace))
    .put(isLoggedIn, isAuthor, upload.array('image'), validatePlace, catchAsync(places.updatePlace))
    .delete(isLoggedIn, isAuthor, catchAsync(places.deletePlace));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(places.editForm))

module.exports = router;