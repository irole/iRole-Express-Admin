// Middleware
import Middleware from './Middleware';
import userService from '../services/UserService';

class RememberLogin extends Middleware {
    // Check if User Use remember me
    handle(req: any, res: any, next: any) {
        try {
            if (!req.isAuthenticated()) {
                const rememberToken = req.signedCookies.remember_token;
                if (rememberToken) return this.userFind(rememberToken, req, next);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    // Find User
    async userFind(rememberToken: any, req: any, next: any) {

        const user = await userService.findOne({rememberToken});
        if (user) {
            req.logIn(user, (err: any) => {
                if (err) next(err);
            });
        }
        next();
    }
}

export default  new RememberLogin();
