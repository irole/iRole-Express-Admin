// Controllers
import MasterController from '../MasterController';

export default class Controller extends MasterController {

    login(req, res, user) {
        req.logIn(user, (err) => {
            if (req.body.remember) {
                user.setRememberToken(res);
            }
            if (user.admin) return res.redirect('/');
            return res.redirect('/intro');
        });
    }
};
