import express from 'express';
import passport from 'passport';
// Middlewares
import validateRequest from '../../middlewares/ValidateRequest';

const router = express.Router();

// Controllers
import registerController from '../../controllers/auth/RegisterController';
import loginController from '../../controllers/auth/LoginController';
import forgotPasswordController from '../../controllers/auth/ForgotPasswordController';
import resetPasswordController from '../../controllers/auth/ResetPasswordController';
import googleAuthController from '../../controllers/auth/socials/GoogleAuthController';

// Validators
import registerValidator from '../../validators/public/auth/RegisterValidator';
import loginValidator from '../../validators/public/auth/LoginValidator';
import forgotPasswordValidator from '../../validators/public/auth/ForgotPasswordValidator';
import resetPasswordValidator from '../../validators/public/auth/ResetPasswordValidator';

//---------------------------Register Routers ----------------------------
router.get('/register', registerController.showRegistrationFrom);
router.post('/register', registerValidator.handle(), validateRequest.handle, registerController.process);
// -----------------------------------------------------------------------

// ---------------------------Login Routers ------------------------------
router.get('/login', loginController.showLoginForm);
router.post('/login', loginValidator.handle(), validateRequest.handle, loginController.process);
// -----------------------------------------------------------------------

//---------------------------Forgot Password Routers -----------------------------------
router.get('/password/forgot', forgotPasswordController.showForgotPasswordForm);
router.post('/password/forgot', forgotPasswordValidator.handle(), validateRequest.handle, forgotPasswordController.forgotPasswordProcess);
router.get('/password/reset/:token', resetPasswordController.showResetPasswordForm);
router.post('/password/reset', resetPasswordValidator.handle(), validateRequest.handle, resetPasswordController.resetPasswordProcess);
// -------------------------------------------------------------------------------------

//---------------------------Google Login Routers ---------------------------------------
router.get('/google', passport.authenticate('google', {
    session: true,
    scope: ['profile', 'email']
}));
router.get('/google/callback', passport.authenticate('google', {
    session: true,
    failureRedirect: 'auth/register'
}), googleAuthController.callBack);
// --------------------------------------------------------------------------------------

// router.post('/forgot-password', forgotPasswordValidator.handle(), forgotPasswordController.process);
// router.get('/reset-password/:token', resetPasswordController.index);
// router.post('/reset-password/:token', resetPasswordValidator.handle(), resetPasswordController.process);

//---------------------------Facebook Login Routers ---------------------------------------
// router.get('/auth/facebook', passport.authenticate('facebook'));
//
// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/',
//         failureRedirect: '/login'
//     }));

// -------------------------------------------------------------------------------------
export {router as authRouter};
