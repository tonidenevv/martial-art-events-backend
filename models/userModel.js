const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username should be at least 5 characters.'],
        maxLength: [15, 'Username should not be longer than 15 characters.'],
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Username should be at least 5 characters.'],
        maxLength: [15, 'Username should not be longer than 15 characters.'],
    },
    attending: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
    }],
});

module.exports = mongoose.model('User', userSchema);