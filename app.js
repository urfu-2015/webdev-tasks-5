const express = require('express');
const app = express();

app.get('*', (req, res) => {
    res.send('hi!!!');
});


app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;