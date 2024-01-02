const router = require('express').Router();
const users = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', users.login);

router.post('/register', users.register);

router.get('/logout', authMiddleware, users.logout);

module.exports = router;