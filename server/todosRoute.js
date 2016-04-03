const express = require('express');
const router = express.Router();

const notes = require('./controllers/notes');

router.get('/', notes.list);
router.post('/add', notes.create);
router.put('/edit', notes.edit);
router.delete('/delete', notes.delete);

module.exports = router;
