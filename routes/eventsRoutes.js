const router = require('express').Router();
const events = require('../controllers/eventController');

router.get('/', events.getAll);

router.get('/:eventId', events.getOne);

router.put('/:eventId', events.edit);

router.post('/', events.create);

router.post('/:eventId/comment', events.createComment);

// router.post('/:eventId/attend', events.attendEvent);

module.exports = router;