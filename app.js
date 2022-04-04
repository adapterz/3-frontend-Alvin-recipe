const express = require('express');
const app = express();

const port = 80;

const indexRouter = require('./routes/index');

app.use(express.static('public/'));
app.use('/', indexRouter);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});

app.use(function (req, res, next) {
    res.status(404).send('not found!');
});

module.exports = app;
