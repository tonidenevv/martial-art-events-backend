const router = require('express').Router();
const users = require('../controllers/userController');

router.post('/login', users.login);

router.post('/register', users.register);

router.get('/logout', users.logout);

module.exports = router;