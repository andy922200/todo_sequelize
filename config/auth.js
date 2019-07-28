//.config/auth.js
module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
  }
}