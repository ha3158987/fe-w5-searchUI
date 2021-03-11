const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const imageRouter = require('./routes/image');

app.use('/', indexRouter);
app.use('/image', imageRouter);

module.exports = app;
