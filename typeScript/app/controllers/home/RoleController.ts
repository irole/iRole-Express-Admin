// interfaces
import {AdminPageInterface} from './interfaces/AdminPageInterface';

import translate from '../../helpers/translate';
// Controllers
import Controller from './Controller';
// Service
import roleService from '../../services/RoleService';
import permissionService from '../../services/PermissionService';

// Message Handling

class RoleController extends Controller implements AdminPageInterface {

    async index(req: any, res: any, next: any) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Roles');
            // Paginate
            let page = req.query.page || 1;
            // Select All Role
            const roles = await roleService.paginate({}, page, {createdAt: 1}, 20);
            res.render('home/roles', {
                roles,
                title
            });
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-create', 'Create Role');
            // Select All Permission
            const permissions = await permissionService.findAll();
            return res.render('home/roles/create', {
                permissions,
                title
            });
        } catch (e) {
            next(e);
        }
    }

    async store(req, res, next) {
        try {
            // Get Input Value
            let {
                name,
                label,
                permissions,
                lang
            } = req.body;
            //--------------Create New Role -------------
            await roleService.insert({
                name,
                label,
                lang,
                permissions
            });
            //--------------------------------------------
            return res.redirect('/roles');
        } catch (e) {
            next(e);
        }
    }

    async edit(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-edit', 'Edit Role');
            // Select Role by Role id
            const role = await roleService.findById(req.params.id);
            // Check Role is Exist
            if (!role) this.error(translate(req, __filename, 'not-found-edit', 'role not found !'), 404);
            // Select All Permission
            const permissions = await permissionService.findAll();
            return res.render('home/roles/edit', {
                role,
                title,
                permissions
            });
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            // Get Input Value
            let {
                name,
                label,
                permissions,
                lang
            } = req.body;
            //--------------Update Role-------------------------
            await roleService.findByIdAndUpdate(req.params.id, {
                    $set: {
                        name,
                        label,
                        lang,
                        permissions
                    }
                }
            );
            //------------------------------------------------
            return res.redirect('/roles');
        } catch (e) {
            next(e);
        }
    }

    async destroy(req, res, next) {
        try {
            if (req.body.deleteConfirm) {
                // Select Role Where Role Id
                let role = await roleService.findById(req.params.id);
                // Check Role is Exist
                if (!role) this.error(translate(req, __filename, 'not-found-destroy', 'role not found !'), 404);
                // Delete Role
                await roleService.remove(req.params.id);
                // Response to Ajax
                res.json({delete: true});
            } else { // Show Sweet Alert
                return this.alertDelete(req, res, {
                    text: translate(req, __filename, 'destroy-text-sweetalert', 'are you sure ? ')
                });
            }
        } catch (e) {
            next(e);
        }
    }

}

export default new RoleController();
