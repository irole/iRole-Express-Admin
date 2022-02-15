import express from 'express';
// Service
import userService from '../services/UserService';
import translate from "../helpers/translate";
// Packages
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// -------------- Passport Setup---------------
passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done: any) => {
    const user = await userService.findById(id);
    if (!user) {
        done(user, null);
    } else {
        done(null, user);
    }
});
//---------------------------------------------

passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email: string, password: string, done) => {
    // Add New User
    const newUser = await userService.registerProcess(email, password);
    if (newUser === 500) return done(req.flash('global_error', translate(req, __filename, 'register-fail', 'Server Error !')), null);
    return done(null, newUser);
}));

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email: string, password: string, done) => {
    // Select User Where email
    const user = await userService.findOne({email});
    // Check user Exist or Incorrect Password
    if (!user || !user.comparePassword(password)) return done(req.flash('global_error', translate(req, __filename, 'password-wrong', 'email or password is wrong!')), null);
    done(null, user);
}));
