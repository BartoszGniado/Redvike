const User = require('../db/models/user');

exports.getUser = async (username) => {
  const users = await User.find();
  return users.find((user) => user.username === username);
};

exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};
