// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
  const user = req.body;
  db.insert(user)
    .then(user => {
      if (!user.name || !user.bio) {
        res.status(400).json({
          success: false,
          message: 'Please provide name and bio for the user.'
        });
      }
      res.status(201).json({ success: true, user });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: 'There was an error while saving the user to the database'
      });
    });
});

server.listen(3333, () => {
  console.log('Listening to port 3333');
});
