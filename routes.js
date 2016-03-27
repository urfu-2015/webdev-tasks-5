var express = require('express');
var router = express.Router();
var remarks = require('./controllers/remarks.js');
var main = require('./controllers/main.js');

router.get('/', main.getIndex);

router.get('/remarks', remarks.getRemarks);

router.post('/remarks/new', remarks.newRemark);

router.put('/remarks/:id', remarks.redoRemark);

router.delete('/remarks/:id', remarks.deleteRemark);

module.exports = router;
