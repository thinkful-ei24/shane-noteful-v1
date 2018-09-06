const morgan = require('morgan');

// const logOut = function (req, res, next) {
//   const curDate = new Date();
//   console.log(`${curDate.toString()} ${req.method} ${req.url}`);
//   next();
// };

const morganLog = () => {
  return morgan('dev');
  //return morgan(':date[clf] :method :url');
}

module.exports = {
  //logOut,
  morganLog
}

