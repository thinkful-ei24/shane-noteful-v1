'use strict';

console.log('Hello Noteful!');

const express = require('express');
const morgan = require('morgan');
const { logOut } = require('./middleware/logger');
const data = require('./db/notes');
const { PORT } = require('./config');

const app = express();

app.use(express.static('public'));
app.use(logOut);
app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  if(searchTerm) {
      let filteredData = data.filter(item => item.title.includes(req.query.searchTerm));
      return res.json(filteredData);
    } else return res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const note = data.find(item => item.id === Number(req.params.id));
  if(!data) {
    return res.sendStatus(404);
  }
  return res.send(note);
})

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
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