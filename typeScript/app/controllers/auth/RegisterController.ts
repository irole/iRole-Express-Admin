// Packages
import translate from "../../helpers/translate";

const passport = require('passport');
// Controllers
import Controller from './Controller';

class RegisterController extends Controller {
    showRegistrationFrom(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Register');
            res.render('auth/register', {title});
        } catch (e) {
            next(e);
        }
    }

    async process(req, res, next) {
        try {
            passport.authenticate('local.register', {session: true}, (err, user): void => {
                // When res have Error
                if (err) return res.redirect('/auth/register');
                this.login(req, res, user);
            })(req, res);
        } catch (e) {
            next(e);
        }
    }
}

export default new RegisterController();
