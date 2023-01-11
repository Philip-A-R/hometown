const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } }
const PlaceSchema = new Schema({
    name: String,
    images: [
        {
            url: String,
            filename: String,
        }
    ],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    location: String,
    description: String,
    price: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        enum: ['roastery', 'brewery', 'eatery']
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, opts);

PlaceSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/places/${this._id}"> ${this.name} </a></strong>
    <p>${this.category}</p>
    `
})

PlaceSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Place', PlaceSchema)

