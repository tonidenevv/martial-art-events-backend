const router = require('express').Router();
const events = require('../controllers/eventController');

router.get('/', events.getAll);

router.get('/:eventId', events.getOne);

module.exports = router;