var express = require('express');
var router = express.Router();
var remarks = require('./controllers/remarks.js');
var main = require('./controllers/main.js');

//главная страница
router.get('/', main.getIndex);

//загрузка страницы
router.get('/remarks', remarks.getRemarks);

router.get('/api/remarks', remarks.getRemarksJSON);

//добавление новой заметки
router.post('/remarks/new', remarks.newRemark);

//редактрование заметки
router.put('/remarks/:id', remarks.redoRemark);

//удаление заметки
router.delete('/remarks/:id', remarks.deleteRemark);

//поменять номер заметки(доп)
router.post('/remark/:id/:newId', remarks.changeNumber);



module.exports = router;