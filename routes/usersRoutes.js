const router = require('express').Router();

router.get('/login', (req, res) => {
    res.send('Login...')
});

router.get('/register', (req, res) => {
    res.send('Register...');
});

router.get('/logout', (req, res) => {
    res.send('Logout...');
});

module.exports = router;