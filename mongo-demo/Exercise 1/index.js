const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function main() {
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
    const course = await Course.update(
      { _id: id },
      {
        $set: {
          author: 'Mosh',
          isPublished: false,
        },
      }
    );

    console.log(course);
  };

  //   updateCourse('63ee3137de88a062ed00ac55');

  const deleteCourse = async (id) => {
    const result = await Course.findByIdAndRemove(id);

    console.log(result);
  };
  deleteCourse('63ee354982f3a22f208421ff');
}

main();
