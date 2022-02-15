// Packages
import translate from "../../helpers/translate";

const passport = require('passport');
// Controllers
import Controller from './Controller';

class LoginController extends Controller {

    showLoginForm(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Login');
            res.render('auth/login', {title});
        } catch (e) {
            next(e);
        }
    }

    async process(req, res, next) {
        try {
            passport.authenticate('local.login', async (err, user) => {
                // User not Exist
                if (!user) return this.back(req, res);
                // User not Active
                this.login(req, res, user);

            })(req, res, next);
        } catch (e) {
            next(e);
        }
    }

}

export default new LoginController();
