const mongoose = require('mongoose');

const disallowedCharactersValidator = (value) => {
    const disallowedChars = /[!@#$%^&*(),.?":{}|<>]/;
    return !disallowedChars.test(value);
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username should be at least 5 characters.'],
        maxLength: [12, 'Username should not be longer than 12 characters.'],
        validate: {
            validator: disallowedCharactersValidator,
            message: 'Username contains characters that are not allowed.'
        }
    },
    password: {
        type: String,
        required: true,
    },
    attending: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
    }],
});

module.exports = mongoose.model('User', userSchema);