const express = require('express')
router = express.Router({ mergeParams: true })
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middlewear')

const Place = require('../models/shops')
const Review = require('../models/review')
const { reviewSchema } = require('../schemas/schemas.js')

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const reviews = require('../controllers/reviews')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;