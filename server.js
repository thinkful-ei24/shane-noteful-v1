'use strict';

console.log('Hello Noteful!');

const express = require('express');
const morgan = require('morgan');
const { logOut } = require('./middleware/logger');
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const { PORT } = require('./config');

const app = express();

app.use(express.static('public'));
app.use(logOut);

app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

app.get('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  notes.find(noteId, (err, list) => {
    if(err) {
      return next(err);
    }
    res.json(list);
  });
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({message: 'Not Found'});
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  })
})

app.listen(PORT, () => {
  console.info(`Server listening on http://127.0.0.1:8080`);
}).on('error', err => {
  console.error(err);
});