'use strict';

console.log('Hello Noteful!');

const express = require('express');
const { morganLog } = require('./middleware/logger');
const { PORT } = require('./config');
const NotesRouter = require('./routers/notes.router');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morganLog());
app.use('/api/notes', NotesRouter);


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