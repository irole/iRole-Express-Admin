// Packages
import express from 'express';

const router = express.Router();

// Controllers
import userController from '../../controllers/home/UserController';
// Validators
import registerValidator from '../../validators/public/auth/RegisterValidator';
// Middlewares
import validateRequest from '../../middlewares/ValidateRequest';

// ---------------------------Users Routers---------------------------
// users index
router.get('/', userController.index);
router.get('/admins', userController.admins);
// // users change role
router.get('/:id/change-role', userController.changeRole);
router.put('/:id/change-role', userController.storeRoleForUser);
// // users toggle admin
router.get('/:id/toggleadmin', userController.toggleAdmin);
// // users create new user
router.get('/create', userController.create);
router.post('/', registerValidator.handle(), validateRequest.handle, userController.store);
// -------------------------------------------------------------------

export {router as userRouter};
