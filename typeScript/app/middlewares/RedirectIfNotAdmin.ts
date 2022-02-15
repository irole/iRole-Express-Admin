// Middleware
import Middleware from './Middleware';

class RedirectIfNotAdmin extends Middleware {
    // Check Admin User
    handle(req: any, res: any, next: any) {
        if (req.isAuthenticated() && req.user.admin)
            return next();
        return res.redirect('/auth/login');
    }
}

export default new RedirectIfNotAdmin();
