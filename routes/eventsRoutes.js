const router = require('express').Router();
const events = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', events.getAll);

router.get('/:eventId', events.getOne);

router.put('/:eventId', events.edit);

router.delete('/:eventId', events.del);

router.post('/', authMiddleware, events.create);

router.post('/:eventId/comment', events.createComment);

// router.post('/:eventId/attend', events.attendEvent);

module.exports = router;