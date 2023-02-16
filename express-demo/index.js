const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const home = require('./routes/home');
const app = express();

const courses = require('./routes/courses');

app.set('view engine', 'pug');
app.set('views', './views'); //default
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use('/api/courses', courses);
app.use('/', home);

console.log('Application Name : ' + config.get('name'));
console.log('Mail Server Name : ' + config.get('mail.host'));
console.log('Mail Password : ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('morgan enabled....');
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening port ${port}.....`));
