const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const Joi = require('joi');

const express = require('express');
const logger = require('./logger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
console.log(process.env.NODE_ENV);

console.log('Application Name : ' + config.get('name'));
console.log('Mail Server Name : ' + config.get('mail.host'));
console.log('Mail Password : ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('morgan enabled....');
}

const courses = [
  { id: 1, name: 'courses1' },
  { id: 2, name: 'courses2' },
  { id: 3, name: 'courses3' },
];

app.get('/', (request, response) => {
  response.send([1, 23, 33, 45]);
});

app.get('/api/courses', (request, response) => {
  response.send(courses);
});
app.post('/api/courses', (request, response) => {
  const { error } = validateCourse(request.body);
  if (error) {
    response.status(400).send(error);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: request.body.name,
  };

  courses.push(course);
  response.send(course);
});

app.put('/api/courses/:id', (request, response) => {
  // look up the course
  //if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(request.params.id));
  if (!course)
    return response
      .status(404)
      .send('The course with the given ID was not found.');

  //validate
  //if invalid,return 400-bad request

  const { error } = validateCourse(request.body);
  if (error) {
    console.log('s');
    response.status(400).send(error.details[0].message);
    return;
  }

  //Update course
  course.name = request.body.name;
  response.send(course);
  //return the updated course
});

app.delete('/api/courses/:id', (request, response) => {
  const course = courses.find((c) => c.id === parseInt(request.params.id));
  if (!course)
    return response
      .status(404)
      .send('The course with the given ID was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  response.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

app.get('/api/courses/:id', (request, response) => {
  const course = courses.find((c) => c.id === parseInt(request.params.id));
  if (!course)
    return response
      .status(404)
      .send('The course with the given ID was not found.');
  response.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening port ${port}.....`));
