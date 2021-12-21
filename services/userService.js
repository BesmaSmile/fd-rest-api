const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const config = require('../config.json');

function _createNewUser(params) {
  const { password, ...user } = params;
  if (password) {
    user.hash = bcrypt.hashSync(password, 10);
  }
  return user;
}

function register(_user) {
  const newUser = new db.User(_createNewUser(_user));
  return newUser.save().then((user) => {
    
  const token = jwt.sign({ sub: user._id }, config.secret);
  return {
    ...user._doc,
    token,
  };
  }).catch((err) => {
    console.log(err);
    throw { code: 500, error: 'internal_error' };
  });
}

async function login({ email, password }) {
  const user = await db.User.findOne({ email }).exec()
    .catch(() => { throw { code: (500), errors: 'internal_error' }; });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user._id }, config.secret);
    return {
      ...user._doc,
      token,
    };
  } throw { code: 403, error: 'incorrect_credentials' };
}

async function getUserById(id) {
  const user = await db.User.findById(id).exec()
    .catch((err) => {
      console.log(err);
      throw { code: (500), error: 'internal_error' };
    });
  return user;
}

module.exports = {
  register,
  login,
  getUserById,
};
