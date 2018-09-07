const express = require('express');
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

const NotesRouter = express.Router();

NotesRouter.get('/', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm)
    .then(list => {
      console.log(searchTerm);
      if(list){
        res.json(list);
      } else {
        next();
      }
    })
    .catch(err => {
      return next(err);
  });
});


NotesRouter.get('/:id', (req, res, next) => {
  const noteId = req.params.id;

  notes.find(id)
    .then(list => {
      if(item){
        res.json(list);
      } else {
        next();
      }
    })
    .catch(err => {
      return next(err);
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

  notes.update(id, updateObj)
    .then(item => {
      if(item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      return next(err);
    })
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

  notes.create(newItem)
    .then((item) => {
      if(item) {
        res.location();
      } else {
        next();
      }
    })
    .catch((err) => {
      return next(err);
  });
});

NotesRouter.delete('/:id', (req, res, next) => {
  const noteId = req.params.id;

  notes.delete(noteId)
    .then(noteId => {
      res.sendStatis(204);
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = NotesRouter;
