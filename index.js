const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const eventsRoutes = require('./routes/eventsRoutes');
const usersRoutes = require('./routes/usersRoutes')

mongoose.connect(process.env.CONNECTION_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB Connected!');
})

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/events', eventsRoutes);
app.use('/users', usersRoutes);

app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}...`))