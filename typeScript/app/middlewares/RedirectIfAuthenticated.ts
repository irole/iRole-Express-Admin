// Middleware
import Middleware from './Middleware';

class redirectIfAuthenticated extends Middleware {
    // Check User Authenticated
    handle(req: any, res: any, next: any) {
        if (req.isAuthenticated()) {
            if (req.user.admin) return res.redirect('/');
            return res.redirect('/intro')
        }
        next();
    }
}

export default new redirectIfAuthenticated();
