const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('All Events!');
});

router.get('/:eventId', (req, res) => {
    const eventId = req.params.eventId;

    res.send(`Event with ID: ${eventId}`);
});

module.exports = router;