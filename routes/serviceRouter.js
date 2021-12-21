const express = require('express');
const uploadImage = require('../helpers/uploadImage');

const router = express.Router();
const serviceService = require('../services/serviceService');
// const serviceValidator = require('../middlewares/serviceValidator');

const uploadImg = uploadImage('./public/serviceImages/');

function getServices(req, res) {
  serviceService.getServices()
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function addService(req, res) {
  const service = JSON.parse(req.body.service);
  if (req.files.image) {
    service.image = req.files.image[0].filename;
  }
  if (req.files.icon) {
    service.icon = req.files.icon[0].filename;
  }
  serviceService.addService(service)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function test(req, res) {
  return res.json({ test: "ok" });
}

router.get('/test', test);
router.get('/get_all', getServices);
router.post('/add', uploadImg.fields([
  { name: 'image', maxCount: 1 },
  { name: 'icon', maxCount: 1 }]), /* serviceValidator.addService, */ addService);
module.exports = router;
