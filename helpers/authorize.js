const jwt = require('express-jwt');
const config = require('../config.json');

module.exports = authorize;

function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    jwt({ secret: config.secret }),

    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({ errors: 'unauthorized' });
      }
      next();
    },
  ];
}
