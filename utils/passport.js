const LocalStrategy = require('passport-local').Strategy;
const Bcrypt = require('bcryptjs');
const UserSchema = require('../db/user');

// Initialize passport using local strategy authentication
function Initialize(passport) {
    const AuthenticateUser = async (username, password, done) => {
        // Check if user exist
        const user = await UserSchema.findOne({ username_lower: username.toLowerCase() });

        if (!user) {
            console.log('User is not found!');
            return done(null, false, { msg: 'Invalid username. Please check your username.' });
        }

        // Compare password if user is found
        if (await Bcrypt.compare(password, user.password)) {
            console.log('User is found! Correct password!');
            return done(null, user);
        } else {
            console.log('User is found! Incorrect password!');
            return done(null, false, { msg: 'Incorrect password! Please check your password.' });
        }
    }

    // User LocalStrategy for authentication and serialization
    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallBack: true }, AuthenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        UserSchema.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

module.exports = {
    Initialize: Initialize
}