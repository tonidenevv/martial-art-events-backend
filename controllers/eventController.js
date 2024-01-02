const Event = require('../models/eventModel');
const User = require('../models/userModel');

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
        const event = new Event({ ...data, _ownerId: req.user._id });
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: "Something went wrong" });
        console.log(error);
    }
}

const comment = async (req, res) => {
    const eventId = req.params.eventId;
    const comment = req.body.comment;
    if (comment.length < 5 || comment.length > 20) {
        return res.status(400).json('Comment should be between 5 and 20 characters');
    }
    const isValid = mongoose.isValidObjectId(eventId);
    if (isValid) {
        try {
            const event = await Event.findById(eventId);
            if (event) {
                event.comments.push(comment);
                await event.save();
                return res.status(201).json(comment);
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
            res.status(200).json(event);
        } catch (error) {
            res.status(400).json({ message: "Something went wrong." });
        }
    } else {
        res.status(404).json({ message: 'Invalid ID.' });
    }
}



const del = async (req, res) => {
    const eventId = req.params.eventId;
    const isValid = mongoose.isValidObjectId(eventId);
    if (isValid) {
        try {
            const event = await Event.findByIdAndDelete(eventId, { new: true });
            res.status(200).json(event);
        } catch (err) {
            res.status(400).json({ message: "Something went wrong." });
        }
    } else {
        res.status(404).json({ message: 'Invalid ID' });
    }
}

const attend = async (req, res) => {
    const eventId = req.params.eventId;
    if (!mongoose.isValidObjectId(eventId)) return res.status(404).json({ message: 'Invalid ID' });

    try {
        const event = await Event.findById(eventId);
        if (event) {
            if (!mongoose.isValidObjectId(req.user._id)) return res.status(404).json({ message: 'Invalid user ID' });
            const user = await User.findById(req.user._id);
            if (user) {
                if (event.attending.some(x => x.valueOf() === req.user._id)) return res.status(409).json({ message: 'Already attending' });
                event.attending.push(req.user._id);
                await event.save();
                user.attending.push(eventId);
                await user.save();
                res.status(200).json(event);
            }
        } else {
            res.status(404).json({ message: 'No event with such ID' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Something went wrong' });
        console.log(err);
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    comment,
    edit,
    del,
    attend,
}