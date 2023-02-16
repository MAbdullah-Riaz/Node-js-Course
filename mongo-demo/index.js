const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to the MongoDB...'))
  .catch((err) => console.error('could not connect to MongoDb...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

// createCourse();

const getCourse = async () => {
  const courses = await Course
    //   .find({
    //     isPublished: true,
    //   })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 16] } })

    .find({ author: /^Mosh/ }) //starts with Mosh
    // .find({ author: /Mosh$/i }) //Ends with Mosh,i is used to ignore case sensitive
    // .find({ author: /.*Mosh.*/ }) //can be anything at the start or the end
    .skip((pageNumber - 1) * pageSize)
    .limit(10)

    .sort({ name: -1 })
    .count();

  console.log(courses);
};

getCourse();
