const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User belonging to this token no longer exists.',
        });
      }

      next();
    } catch (error) {
      console.error('[FitTrack Auth] Token verification error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed or expired',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no authentication token provided',
    });
  }
};

// Guard to block mutating actions on the public demo account
const preventDemoAction = (req, res, next) => {
  if (req.user && req.user.email && req.user.email.toLowerCase() === 'alex.fit@example.com') {
    return res.status(403).json({
      success: false,
      message: 'Demo account is read-only. Create your own free account to add, edit, or delete workouts!',
    });
  }
  next();
};

module.exports = { protect, preventDemoAction };
