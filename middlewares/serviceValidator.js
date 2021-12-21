const Validator = require('../helpers/validate');

const addService = async (req, res, next) => {
  const validationRule = {
    name: 'required|string|exist:Service,name',
    category: 'required|string',
    description: 'required|string',
    params: {
      withDestination: 'bool',
      withDescription: 'bool',
    },
    commission: {
      workforce: 'required|number',
    },
  };

  await Validator(req.body, validationRule, {}, (errors, status) => {
    if (!status) {
      res.status(400)
        .send(errors);
    } else {
      next();
    }
  });
};

module.exports = {
  addService,
};
