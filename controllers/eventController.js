const Event = require('../models/eventModel');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong." })
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
            res.status(400).json({ message: "Something went wrong" });
            console.log(error);
        }
    } else {
        res.status(404).json({ message: 'Invalid ID.' });
    }
}

const create = async (req, res) => {
    const data = req.body;
    try {
        const event = new Event(data);
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: "Something went wrong" });
        console.log(error);
    }
}

const createComment = async (req, res) => {
    const eventId = req.params.eventId;
    const comment = req.body.comment;
    if (!comment) {
        return res.status(400).json('Comment is empty');
    }
    const isValid = mongoose.isValidObjectId(eventId);
    if (isValid) {
        try {
            const event = await Event.findById(eventId);
            if (event) {
                event.comments.push(comment);
                await event.save();
                return res.status(200).json(event);
            } else {
                return res.status(404).json({ message: 'No event with such ID.' });
            }
        } catch (error) {
            res.status(400).json({ message: "Something went wrong" });
            console.log(error);
        }
    } else {
        return res.status(404).json({ message: 'Invalid ID.' });
    }
}

const edit = async (req, res) => {
    const eventId = req.params.eventId;
    const data = req.body;
    const isValid = mongoose.isValidObjectId(eventId);
    if (isValid) {
        try {
            const event = await Event.findByIdAndUpdate(eventId, data, { new: true, runValidators: true });
            console.log(event);
            res.status(200).json(event);
        } catch (error) {
            res.status(400).json({ message: "Something went wrong." });
        }
    } else {
        res.status(404).json({ message: 'Invalid ID.' });
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    createComment,
    edit,
}