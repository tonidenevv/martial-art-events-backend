const mongoose = require('mongoose');

const disallowedCharactersValidator = (value) => {
    const disallowedChars = /[!@#$%^&*(),.?":{}|<>]/;
    return !disallowedChars.test(value);
}

const validImageValidator = (imageUrl) => {
    fetch(imageUrl)
        .then(res => {
            return res.ok ? true : false;
        })
        .catch(() => {
            return false;
        })
}

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title field is required.'],
        minLength: [5, 'Title should be at least 5 characters.'],
        maxLength: [15, 'Title should be 15 characters at most.'],
        validate: {
            validator: disallowedCharactersValidator,
            message: 'Title contains characters that are not allowed.'
        }
    },
    sport: {
        type: String,
        required: [true, 'The sport field is required.'],
        minLength: [2, 'Sport should be at least 2 characters.'],
        maxLength: [15, 'Sport should be 15 characters at most.'],
        validate: {
            validator: disallowedCharactersValidator,
            message: 'Sport contains characters that are not allowed.'
        }
    },
    ticketPrice: {
        type: Number,
        required: [true, 'The ticket price field is required.'],
        min: [1, 'Price must be at least 1$.'],
        max: [9999, 'Price should not be higher than 9999$.']
    },
    description: {
        type: String,
        required: [true, 'The description field is required.'],
        minLength: [5, 'Description should be at least 5 characters.'],
        maxLength: [20, 'Description should not be more than 20 characters'],
        validate: {
            validator: disallowedCharactersValidator,
            message: 'Description contains characters that are not allowed.'
        }
    },
    imageUrl: {
        type: String,
        required: [true, 'The image URL field is required.'],
    },
    comments: {
        type: [String],
        default: [],
    },
    attending: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }],
    _ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Event', eventSchema);