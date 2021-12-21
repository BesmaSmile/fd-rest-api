const express = require('express');

const router = express.Router();
const userService = require('../services/userService');
const validator = require('../middlewares/userValidator');

async function register(req, res) {
  userService.register(req.body)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function login(req, res) {
  userService.login(req.body).then((user) => {
    res.json(user);
  }).catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

router.post('/login', validator.login, login);
router.post('/register', validator.register, register);

module.exports = router;

/**
 * @swagger
 * /partner/register:
 *   post:
 *     summary: Register new partner
 *     tags:
 *       - Partner
 *     parameters:
 *       - name: User informations
 *         required: true
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *            firstname:
 *              type: string
 *              required: true
 *              example: 'myFirstname'
 *            lastname:
 *              type: string
 *              required: true
 *              example: 'myLastname'
 *            phoneNumber:
 *              type: string
 *              required: true
 *              example: '+213555667788'
 *            email:
 *              type: string
 *              required: true
 *              example: example@gmail.com
 *            type:
 *              type: string
 *              required: true
 *              example: B2B|particular
 *            password:
 *              type: string
 *              required: true
 *              example: p@sswordX20
 *            password_confirmation:
 *              type: string
 *              required: true
 *              example: p@sswordX20
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *         schema :
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *               properties:
 *                 field_name:
 *                   type: string
 *               example: {'firstname' : ['required_field', 'expected_string'], 'lastname':['required_field', 'expected_string'],'type':['required_field', 'expected_string','invalid_type'], 'email':['required_field', 'expected_string','existing_email','invalid_email'],'phoneNumber': ['required_field', 'expected_string','existing_phoneNumber','invalid_phoneNumber'], 'password': ['required_field','expected_string','short_password','weak_password','mismatched_password']}
 *       500:
 *         description: Server error
 *         schema :
 *           type: object
 *           properties:
 *             errors:
 *               type: string
 *               example: internal_error
 */