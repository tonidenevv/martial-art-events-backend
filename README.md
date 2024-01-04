Rest API Server for https://github.com/tonidenevv/martial-art-events-frontend

# Information
* Used Node.js, Express and MongoDB
* Allows the client to make requests for registering an user, logging in, creating, editing and deleting an event, attending an event, commenting, getting all events, getting all events created by a certain user, getting all events that a user is attending
* Protected routes giving guests limited functionality, allowing users to view and attend events not owned by them but not being able to edit or delete them and allowing owners to edit and delete them without being able to comment or attend them

# Technologies
* Node: 18.18.2
* Express: 4.18.2
* Mongoose: 8.0.3
* Bcrypt": 5.1.1
* Cors: 2.8.5
* Dotenv": 16.3.1
* Jsonwebtoken": 9.0.2
* Nodemon: 3.0.2

# Setup
To run the server, you should run:
```
* Clone the repository
* Run npm install to install the dependencies
* Create your own .env file based on the .env.example file
* Run npm start to start the server
```

After that, you can start the client based on the instructions in the link in the beginning of the README.
