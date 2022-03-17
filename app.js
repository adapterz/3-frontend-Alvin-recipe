const express = require('express');
const app = express();

const port = 3000;

const indexRouter = require('./routes/index');

app.use(express.static('public'));
app.use('/', indexRouter);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;
