const express = require('express');
const router = express.Router();

const notes = require('./controllers/notes');

router.get('/', (req, res) => {
    const Note = require('./models/note');
    const notes = Note.findAll();

    res.json({
        notes: notes
    });
});
router.post('/add', notes.create);
router.put('/edit', notes.edit);
router.delete('/delete', notes.delete);

module.exports = router;
