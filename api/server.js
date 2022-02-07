// BUILD YOUR SERVER HERE

const express = require('express');
const userModel = require('./users/model');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
  const body = req.body;
  if (!body.name) {
    res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' });
  } else if (!body.bio) {
    res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' });
  } else {
    userModel
      .create(body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          message: 'There was an error while saving the user to the database',
        });
      });
  }
});

server.get('/api/users', (req, res) => {
  userModel
    .find()
    .then((users) => {
      console.log(users);
      res.json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The users information could not be retrieved' });
    });
});

// POST	/api/users
// GET	/api/users
// GET	/api/users/:id
// DELETE	/api/users/:id
// PUT	/api/users/:id

module.exports = server; // EXPORT YOUR SERVER instead of {}
