const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    res.send('Login...')
};

const register = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        res.status(409).json({ message: 'Username is already taken' });
    } else {
        if (password !== confirmPassword) {
            res.status(400).json({ message: 'Passwords don\'t match' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await new User(username, hashedPassword);
            await user.save();
            const token = jwt.sign({ _id: user._id, username: user.username });
            res.status(201).json({ token, _id: user._id, username: user.username });
        }
    }
};

const logout = (req, res) => {
    res.send('Logout...');
}

module.exports = {
    login,
    register,
    logout,
}