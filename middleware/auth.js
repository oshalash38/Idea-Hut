const jwt = require('jsonwebtoken');
const config = require('config');

// Authentication middleware
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ msg: 'Invalid token, authorization denied' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('Auth middleware error:' + err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
