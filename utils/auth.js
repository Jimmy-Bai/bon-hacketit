// Ensures that current user is authenticated
// Redirect if user is not authenticated
function EnsureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/signin');
}

// Redirect user to dashboard if user is already logged in
function ForwardAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.redirect('/dashboard');
}

module.exports = {
  EnsureAuthenticated: EnsureAuthenticated,
  ForwardAuthenticated: ForwardAuthenticated
}