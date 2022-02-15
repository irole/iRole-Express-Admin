// Packages
import translate from "../../helpers/translate";

const uniqueString = require('unique-string');
// Controllers
import Controller from './Controller';
// Services
import resetPasswordTokenService from '../../services/ResetPasswordTokenService';
import userService from '../../services/UserService';

class ForgotPasswordController extends Controller {

    showForgotPasswordForm(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Forgot Password');
            res.render('auth/forgot-password', {title});
        } catch (e) {
            next(e);
        }
    }

    async forgotPasswordProcess(req, res, next) {
        try {
            // Get Input Value
            const {email} = req.body;
            // Select User Where Email
            const user = await userService.findOne({email});
            if (user) {
                //--------------Create New PasswordReset -----------
                await resetPasswordTokenService.insert({
                    email,
                    token: uniqueString(),
                });

                //---------------------------------------------------

                //--------------Send Mail ----------------

                //----------------------------------------

            }
            // Send Message To User( Reset Link Send to your Email )

            // --------------------------------------
            res.redirect('/');

        } catch (e) {
            next(e);
        }
    }
}

export default new ForgotPasswordController();
