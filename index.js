const express = require('express');
require('dotenv').config();
const eventsRoutes = require('./routes/eventsRoutes');
const usersRoutes = require('./routes/usersRoutes')

const app = express();

app.use('/events', eventsRoutes);
app.use('/users', usersRoutes);

app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}...`))