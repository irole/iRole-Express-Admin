// Controllers
import Controller from './Controller';

// Service
import roleService from '../services/RoleService';
import permissionService from '../services/PermissionService';
import userService from '../services/UserService';
import translate from "../helpers/translate";

// Message Handling

class InstallerController extends Controller {

    index(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Intro');
            res.render('intro/index');
        } catch (e) {
            next(e);
        }
    }

    async installer(req, res, next) {
        try {
            let writerPermission: any = [];
            if (req.isAuthenticated()) {
                // Select All Role
                let role = await roleService.findAll();
                // Check Role in Database
                if (Object.keys(role).length === 0) {
                    const defaultPermissions = Option['permission'];
                    const defaultRoles = Option['role'];
                    // Get Language
                    const lang = req.getLocale();
                    let permissions = await permissionService.insertMany([
                        // Files
                        {
                            name: defaultPermissions.show_files,
                            group: 'typeScript.option.permissions.groups.files',
                            label: 'typeScript.option.permissions.labels.show-files'
                        },
                        {
                            name: defaultPermissions.add_files,
                            group: 'typeScript.option.permissions.groups.files',
                            label: 'typeScript.option.permissions.labels.add-files'
                        },
                        {
                            name: defaultPermissions.delete_files,
                            group: 'typeScript.option.permissions.groups.files',
                            label: 'typeScript.option.permissions.labels.delete-files'
                        },
                        // Category
                        {
                            name: defaultPermissions.show_categories,
                            group: 'typeScript.option.permissions.groups.categories',
                            label: 'typeScript.option.permissions.labels.show-categories'
                        },
                        {
                            name: defaultPermissions.edit_categories,
                            group: 'typeScript.option.permissions.groups.categories',
                            label: 'typeScript.option.permissions.labels.edit-categories'
                        },
                        {
                            name: defaultPermissions.delete_categories,
                            group: 'typeScript.option.permissions.groups.categories',
                            label: 'typeScript.option.permissions.labels.delete-categories'
                        },
                        {
                            name: defaultPermissions.add_categories,
                            group: 'typeScript.option.permissions.groups.categories',
                            label: 'typeScript.option.permissions.labels.add-categories'
                        },
                        // Users
                        {
                            name: defaultPermissions.show_users,
                            group: 'typeScript.option.permissions.groups.users',
                            label: 'typeScript.option.permissions.labels.show-users'
                        },
                        {
                            name: defaultPermissions.create_users,
                            group: 'typeScript.option.permissions.groups.users',
                            label: 'typeScript.option.permissions.labels.create-users'
                        },
                        {
                            name: defaultPermissions.ban_users,
                            group: 'typeScript.option.permissions.groups.users',
                            label: 'typeScript.option.permissions.labels.ban-users'
                        },
                        {
                            name: defaultPermissions.toggle_admin_users,
                            group: 'typeScript.option.permissions.groups.users',
                            label: 'typeScript.option.permissions.labels.toggle-admin-users'
                        },
                        {
                            name: defaultPermissions.add_role_users,
                            group: 'typeScript.option.permissions.groups.users',
                            label: 'typeScript.option.permissions.labels.add-role-users'
                        },
                        // Roles
                        {
                            name: defaultPermissions.show_roles,
                            group: 'typeScript.option.permissions.groups.role',
                            label: 'typeScript.option.permissions.labels.show-roles'
                        },
                        {
                            name: defaultPermissions.add_roles,
                            group: 'typeScript.option.permissions.groups.role',
                            label: 'typeScript.option.permissions.labels.add-roles'
                        },
                        {
                            name: defaultPermissions.delete_roles,
                            group: 'typeScript.option.permissions.groups.role',
                            label: 'typeScript.option.permissions.labels.delete-roles'
                        },
                        {
                            name: defaultPermissions.edit_roles,
                            group: 'typeScript.option.permissions.groups.role',
                            label: 'typeScript.option.permissions.labels.edit-roles'
                        },
                        // Backups
                        {
                            name: defaultPermissions.show_backups,
                            group: 'typeScript.option.permissions.groups.backups',
                            label: 'typeScript.option.permissions.labels.show-backups'
                        },
                        {
                            name: defaultPermissions.add_backups,
                            group: 'typeScript.option.permissions.groups.backups',
                            label: 'typeScript.option.permissions.labels.add-backups'
                        },
                        {
                            name: defaultPermissions.download_backups,
                            group: 'typeScript.option.permissions.groups.backups',
                            label: 'typeScript.option.permissions.labels.download-backups'
                        },
                        {
                            name: defaultPermissions.restore_backups,
                            group: 'typeScript.option.permissions.groups.backups',
                            label: 'typeScript.option.permissions.labels.restore-backups'
                        },
                        // permissions
                        {
                            name: defaultPermissions.show_permissions,
                            group: 'typeScript.option.permissions.groups.permissions',
                            label: 'typeScript.option.permissions.labels.show-permissions'
                        },
                        {
                            name: defaultPermissions.edit_permissions,
                            group: 'typeScript.option.permissions.groups.permissions',
                            label: 'typeScript.option.permissions.labels.edit-permissions'
                        },
                        {
                            name: defaultPermissions.delete_permissions,
                            group: 'typeScript.option.permissions.groups.permissions',
                            label: 'typeScript.option.permissions.labels.delete-permissions'
                        },
                        {
                            name: defaultPermissions.add_permissions,
                            group: 'typeScript.option.permissions.groups.permissions',
                            label: 'typeScript.option.permissions.labels.add-permissions'
                        },
                    ]);
                    // Permission For Writer Role Files and Category
                    for (let i = 0; i <= 6; i++) {
                        writerPermission.push(permissions[i]);
                    }
                    // Create Primary Roles
                    role = await roleService.insertMany([
                        {
                            name: defaultRoles.owner,
                            lang,
                            label: req.__('typeScript.app.controllers.installer-controller.role.owner'),
                            permissions: [...permissions]
                        },
                        {
                            name: defaultRoles.writer,
                            lang,
                            label: req.__('typeScript.app.controllers.installer-controller.role.writer'),
                            permissions: writerPermission //add permission
                        },
                    ]);
                    // Set User Admin & Role (Owner)
                    await userService.findOneAndUpdate({email: req.user.email}, {
                        $set: {
                            admin: true,
                            role: role[0]._id,
                            emailVerify: true
                        }
                    });
                }
            }
            return res.redirect('/');
        } catch (e) {
            next(e);
        }
    }
}

export default new InstallerController();
