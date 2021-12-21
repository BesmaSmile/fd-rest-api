const Validator = require('../helpers/validate');
const Roles = require('../helpers/roles');

const register = async (req, res, next) => {
  const validationRule = {
    firstname: 'required|string',
    lastname: 'required|string',
    email: 'required|string|email',
    password: 'required|string|min:8|confirmed|strict',
    password_confirmation: 'required|string',
  };

  await Validator(req.body, validationRule, {
    confirmed: 'mismatched_password',
    min: 'short_password',
  }, (errors, status) => {
    if (!status) {
      res.status(400)
        .send(errors);
    } else {
      next();
    }
  });// .then().catch(error=>console.log(error))
};

const login = async (req, res, next) => {
  const validationRule = {
    password: 'required|string',
    email : 'required|string|email',
  };

  await Validator(req.body, validationRule, { email: 'invalid_email' }, (errors, status) => {
    if (!status) {
      res.status(400)
        .send(errors);
    } else {
      next();
    }
  });
};

module.exports = {
  register,
  login,
};
