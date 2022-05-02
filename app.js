process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

import express from 'express';
const app = express();
import { servicePort } from './config/key.js';
import path from 'path';
const __dirname = path.resolve();

const port = servicePort();

import router from './routes/index.js';

app.use('/image', express.static(__dirname + '/public/image'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/script', express.static(__dirname + '/src'));

app.use('/', router);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});

app.use(function (req, res, next) {
    res.status(404).send('not found!');
});

export default app;
