const getAll = (req, res) => {
    res.send('All events!')
}

const getOne = (req, res) => {
    const eventId = req.params.eventId;

    res.send(`Event with ID: ${eventId}`);
}

module.exports = {
    getAll,
    getOne
}