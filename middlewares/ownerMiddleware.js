const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers.authorize;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);

        if (user._id !== req.headers.eventownerid) return res.sendStatus(401);

        req.isOwner = user._id === req.headers.eventownerid;

        next();
    })
}