const { placeSchema, reviewSchema } = require('./schemas/schemas.js')
const ExpressError = require('./utils/ExpressError')
const Place = require('./models/shops')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Login First :)');
        return res.redirect('/login')
    }
    next();
}

module.exports.validatePlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const place = await Place.findById(id)
    if (!place.author.equals(req.user._id)) {
        req.flash('error', 'you do not have permission')
        return res.redirect(`/places/${id}`)
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'you do not have permission')
        return res.redirect(`/places/${id}`)
    }
    next();
}