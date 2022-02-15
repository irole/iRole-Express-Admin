// Controllers
import Controller from '../Controller';

class GoogleAuthController extends Controller {

    async callBack(req, res, next) {
        try {
            req.user.setRememberToken(res);
            res.redirect('/');
        } catch (e: any) {
            next(e);
        }
    }
}

export default new GoogleAuthController();
