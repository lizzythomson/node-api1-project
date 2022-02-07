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
      .insert(body)
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

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userModel
    .findById(id)
    .then((user) => {
      if (user === undefined || user === null) {
        res
          .status(404)
          .json({ message: `The user with the specified does not exist` });
      } else {
        res.json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The user information could not be retrieved' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userModel
    .remove(id)
    .then((user) => {
      if (user === undefined || user === null) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'The user could not be removed' });
    });
});

server.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    const body = req.body;
    if (user === undefined || user === null) {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist' });
    } else if (!body.name) {
      res
        .status(400)
        .json({ message: 'Please provide name and bio for the user' });
      return;
    } else if (!body.bio) {
      res
        .status(400)
        .json({ message: 'Please provide name and bio for the user' });
      return;
    } else {
      const newUser = await userModel.update(id, body);
      res.status(200).json(newUser);
      return;
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'The user information could not be modified' });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
