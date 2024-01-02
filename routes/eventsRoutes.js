const router = require('express').Router();
const events = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const notOwnerMiddleware = require('../middlewares/notOwnerMiddleware');
const ownerMiddleware = require('../middlewares/ownerMiddleware');

router.get('/', events.getAll);

router.get('/:eventId', events.getOne);

router.put('/:eventId', ownerMiddleware, events.edit);

router.delete('/:eventId', ownerMiddleware, events.del);

router.post('/', authMiddleware, events.create);

router.post('/:eventId/comment', notOwnerMiddleware, events.comment);

router.post('/:eventId/attend', notOwnerMiddleware, events.attend);

module.exports = router;