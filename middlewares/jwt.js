const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../services/userService');

async function isRevoked(req, payload, done) {
  const user = await userService
    .getUserById(payload.sub).catch((error) => done(null, false));
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }
  done();
}


function jwt() {
  const { secret } = config;
  return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      /^\/api-docs.*/,
      '/user/login',
      '/user/register',
      /^\/service\/image\/.*/,
      '/service/test',
    ],
  });
}

module.exports = jwt;
