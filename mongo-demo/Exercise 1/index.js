const mongoose = require('mongoose');
// console.log(jData);
// const data = JSON.parse(jData);
mongoose.set('strictQuery', false);

(async () => {
  await mongoose.connect('mongodb://localhost/mongo-exercise');
  //   .then(() => console.log('Connected to the MongoDB...'))
  //   .catch((err) => console.error('could not connect to MongoDb...', err));

  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number,
  });
  const Course = mongoose.model('Course', courseSchema);

  const getCourse = async () => {
    const courses = await Course.find({
      isPublished: true,
    })
      .select({ name: 1, author: 1, price: 1 })
      .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }]);

    return courses;
  };
  getCourse();

  const updateCourse = async (id) => {
    console.log('Course', Course);
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another Author 1';
    const result = await course.save();
    console.log(result);
  };

  updateCourse('63ee3137de88a062ed00ac55');
})();
