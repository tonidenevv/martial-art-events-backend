const Event = require('../models/eventModel');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
    }
}

const getOne = async (req, res) => {
    const eventId = req.params.eventId;
    const isValid = mongoose.isValidObjectId(eventId);
    if (isValid) {
        try {
            const event = await Event.findById(eventId);
            if (event) {
                res.status(200).json(event);
            } else {
                res.status(404).json({ message: 'No event with such ID.' });
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(404).json({ message: 'Invalid ID.' });
    }
}

module.exports = {
    getAll,
    getOne
}