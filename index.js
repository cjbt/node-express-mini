// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
  const user = req.body;

  db.insert(user)
    .then(user => {
      if (!user) {
        res.status(400).json({
          success: false,
          message: 'Please provide name and bio for the user.'
        });
      } else {
        res.status(201).json({ success: true, user });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'There was an error while saving the user to the database'
      });
    });
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.findById(userId)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'the user with the specified ID does not exist.' });
      }
      res.status(200).json({ success: true, user });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

server.listen(3333, () => {
  console.log('Listening to port 3333');
});
