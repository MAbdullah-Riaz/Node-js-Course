const log = (request, response, next) => {
  console.log('loading......');
  next();
};
// const authLog = (request, response, next) => {
//   console.log('loading......');
//   next();
// };

module.exports = log;
// module.exports = authLog;
