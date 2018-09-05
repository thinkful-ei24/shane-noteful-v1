
const logOut = function (req, res, next) {
  const curDate = new Date();
  console.log(`${curDate.toString()} ${req.method} ${req.url}`);
  next();
};

// const morganOut = () => {
//   morgan(':date[clf] :method :url');
// }

module.exports = {
  logOut,
  //morganOut,
}

