process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

const express = require('express');
const app = express();

const port = 80;

const indexRouter = require('./routes/index');

app.use('/image', express.static(__dirname + '/public/image'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/script', express.static(__dirname + '/src'));

app.use('/', indexRouter);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});

app.use(function (req, res, next) {
    res.status(404).send('not found!');
});

module.exports = app;
