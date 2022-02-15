// Middleware
import Middleware from './Middleware';
// Services
import userService from '../services/UserService';

class UserPermission extends Middleware {
    // Define userPermissions in req
    async handle(req, res, next) {
        let userPermissions: any = [];
        if (req.isAuthenticated() && req.user.admin) {
            // Select User in req.user via role & permissions
            let user = await userService.findById(req.user.id, {
                path: 'role',
                populate: {path: 'permissions'}
            });
            // Check User Have Role
            if (user.role) {
                user.role.permissions.forEach((per: any) => {
                    userPermissions.push(per.name);
                });
            }
            req.userPermissions = userPermissions;
        }
        next();
    }
}

export default new UserPermission();
