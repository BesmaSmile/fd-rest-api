const express = require('express');

const router = express.Router();
const userService = require('../services/userService');
const validator = require('../middlewares/userValidator');

async function register(req, res) {
  userService.register(req.body)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ errors: err.errors }); });
}

function login(req, res) {
  userService.login(req.body).then((user) => {
    res.json(user);
  }).catch((err) => { console.log(err); res.status(err.code).json({ errors: err.errors }); });
}

router.post('/login', validator.login, login);
router.post('/register', validator.register, register);

module.exports = router;
