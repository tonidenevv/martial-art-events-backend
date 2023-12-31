require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const wrongDataMessage = { message: 'Wrong username or password' };

    if (!user) {
        res.status(401).json(wrongDataMessage);
    } else {
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).json(wrongDataMessage);
        } else {

            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET_KEY);
            res.status(200).json({ token, _id: user._id, username: user.username })

        }
    }
};

const register = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {

        res.status(409).json({ message: 'Username is already taken' });

    } else if (!existingUser && username && password && confirmPassword) {

        if (password !== confirmPassword) {

            res.status(400).json({ message: 'Passwords don\'t match' });

        } else {

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await new User({ username, password: hashedPassword });
            await user.save();
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET_KEY);
            res.status(201).json({ token, _id: user._id, username: user.username });
        }
    } else {
        res.status(400).json({ message: 'Make sure you are sending valid data' });
    }
};

const logout = (req, res) => {
    const token = req.headers.authorize;
    if (!token) {
        res.status(401).json({ message: "No token sent" });
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decoded) {
                res.status(200).json({ message: "Successfully logged out" });
            }
        } catch (err) {
            res.status(401).json({ message: "Invalid token" });
            console.log(err);
        }
    }
}

module.exports = {
    login,
    register,
    logout,
}