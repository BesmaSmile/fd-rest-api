const db = require('../models');

function getServices() {
  return db.Service.find((err, services) => {
    if (err) {
      console.log(err);
      throw { code: 500, error: 'internal_error' };
    }
    return services;
  });
}

function addService(service) {
  const newService = new db.Service(service);
  return newService.save().catch((error) => {
    console.log(error);
    throw { code: 500, error: 'internal_error' };
  });
}

module.exports = {
  getServices,
  addService,
};
