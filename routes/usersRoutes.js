const router = require('express').Router();
const users = require('../controllers/userController');

router.get('/login', users.login);

router.get('/register', users.register);

router.get('/logout', users.logout);

module.exports = router;