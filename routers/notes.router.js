const express = require('express');
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

const NotesRouter = express.Router();

NotesRouter.get('/', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if(err) {
      return next(err);
    }
    res.json(list);
  });
});

NotesRouter.get('/:id', (req, res, next) => {
  const noteId = req.params.id;

  notes.find(noteId, (err, list) => {
    if(err) {
      return next(err);
    }
    res.json(list);
  });
});

NotesRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;

  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if(field === req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if(err) {
      return next(err);
    }
    if(item) {
      res.json(item);
    } else {
      next();
    }
  });
});

NotesRouter.post('/', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };

  /* Never trust users */
  if(!newItem.title) {
    const err = new Error(`Missing 'title' in request body`);
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if(err) {
      return next(err);
    }
    if(item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

NotesRouter.delete('/:id', (req, res, next) => {
  const noteId = req.params.id;

  notes.delete(noteId, (err) => {
    if(err) {
      return next(err);
    }
    res.sendStatus(204);
  });
});

module.exports = NotesRouter;
