const express = require('express');
const { render } = require('pug');
const router = express.Router();

const courses = [
  { id: 1, name: 'courses1' },
  { id: 2, name: 'courses2' },
  { id: 3, name: 'courses3' },
];

router.get('/', (request, response) => {
  response.send(courses);
});
router.post('/', (request, response) => {
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

router.put('/:id', (request, response) => {
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

router.delete('/:id', (request, response) => {
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

router.get('/:id', (request, response) => {
  const course = courses.find((c) => c.id === parseInt(request.params.id));
  if (!course)
    return response
      .status(404)
      .send('The course with the given ID was not found.');
  response.send(course);
});

module.exports = render;
