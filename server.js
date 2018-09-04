'use strict';

console.log('Hello Noteful!');

const express = require('express');
// Load array of notes
const data = require('./db/notes');

const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const note = data.find(item => item.id === Number(req.params.id));
  if(!data) {
    return res.send('Failed');
  }
  return res.send(note);
})

app.listen(8080, () => { console.info(`Server listening on http://127.0.0.1:8080`)
}).on('error', err => {
  console.error(err);
});