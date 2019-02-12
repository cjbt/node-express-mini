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
      } else {
        res.status(200).json({ success: true, user });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  db.findById(userId)
    .then(response => {
      db.remove(userId)
        .then(() => res.status(200).json(response))
        .catch(() =>
          res.status(500).json({ error: 'The user could not be removed' })
        );
    })
    .catch(error =>
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist' })
    );

  // db.findById(userId).then(() => {
  //   if (!userId) {
  //     res
  //       .status(404)
  //       .json({ message: 'the user with the specified ID does not exist.' });
  //   } else {
  //     db.remove(userId).then(() => {
  //       db.findById(userId)
  //       .then(deleted => {
  //         res.status(200).json({ deleted })
  //       })

  //     });
  //   }
  // });

  // db.remove(userId)
  //   .then(deleted => {
  //     if (!deleted) {
  //       res
  //         .status(404)
  //         .json({ message: 'the user with the specified ID does not exist.' });
  //     } else {
  //       db.findById(userId).then(deletedUser => {
  //         console.log(deletedUser);
  //         res.status(200).json({ deletedUser });
  //       });
  //       // res.status(200).json({ deleted });
  //     }
  //   })
  //   .catch(() => {
  //     res.status(500).json({ error: 'The user could not be removed' });
  //   });
  // xxxxx
  // if (!userId) {
  //   res
  //     .status(404)
  //     .json({ message: 'The user with the specified ID does not exist.' });
  // } else if (!user) {
  //   res
  //     .status(400)
  //     .json({ errorMessage: 'Please provide name and bio for the user.' });
  // } else {
  //   db.update(userId, user)
  //     .then(() => {
  //       db.findById(userId).then(updatedUser => {
  //         res.status(200).json({ updatedUser });
  //       });
  //     })
  //     .catch(() => {
  //       res
  //         .status(500)
  //         .json({ error: 'The user information could not be modified.' });
  //     });
  // }
});

server.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = req.body;

  db.findById(userId)
    .then(userName => {
      if (!userName) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else {
        if (!user.name || !user.bio) {
          res.status(400).json({
            errorMessage: 'please provide name and bio for the user.'
          });
        } else {
          db.update(userId, user)
            .then(() => {
              db.findById(userId).then(updatedUser => {
                res.status(200).json(updatedUser);
              });
            })
            .catch(() =>
              res
                .status(500)
                .json({ error: 'The user information could not be modified.' })
            );
        }
      }
    })
    .catch(() =>
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' })
    );

  // if (!userId) {
  //   res
  //     .status(404)
  //     .json({ message: 'The user with the specified ID does not exist.' });
  // } else if (!user) {
  //   res
  //     .status(400)
  //     .json({ errorMessage: 'Please provide name and bio for the user.' });
  // } else {
  //   db.update(userId, user)
  //     .then(() => {
  // db.findById(userId).then(updatedUser => {
  //   res.status(200).json({ updatedUser });
  // });
  //     })
  //     .catch(() => {
  //       res
  //         .status(500)
  //         .json({ error: 'The user information could not be modified.' });
  //     });
  // }
});

server.listen(3333, () => {
  console.log('Listening to port 3333');
});
