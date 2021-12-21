const Validator = require('validatorjs');
const db = require('../models');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
const phoneRegex = /^(\+213)(5|6|7)[0-9]{8}$/;


Validator.register('strict', (value) => passwordRegex.test(value), 'weak_password');
Validator.register('phone', (value) => phoneRegex.test(value.replace(/-/g, '')), 'invalid_phone_number');

Validator.registerAsync('exist', (value, attribute, req, passes) => {
  if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:collection,field');
  const attArr = attribute.split(',');

  if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

  const { 0: collection, 1: field } = attArr;
  const msg = `existing_${field}`;
  db[collection].findOne({ [field]: value }).exec().then((result) => {
    if (result) {
      passes(false, msg); // return false if value exists
      return;
    }
    passes();
  });
});

Validator.registerAsync('exist-elsewhere', (value, attribute, req, passes) => {
  if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist-elsewhere:collection,field,id');
  const attArr = attribute.split(',');

  if (attArr.length !== 3) throw new Error(`Invalid format for validation rule on ${attribute}`);

  const { 0: collection, 1: field, 2: id } = attArr;
  const msg = `existing_${field}`;
  db[collection].findOne({ [field]: value, _id: { $ne: id } }).exec().then((result) => {
    if (result) {
      passes(false, msg); // return false if value exists
      return;
    }
    passes();
  });
});

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, {
    required: 'required_field',
    string: 'expected_string',
    integer: 'expected_integer',
    ...customMessages,
  });
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;
