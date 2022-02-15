// Packages
import express from 'express';

const router = express.Router();
// Controllers
import roleController from '../../controllers/home/RoleController';
// Validators
import roleValidator from '../../validators/private/RoleValidator';
// Middlewares
import validateRequest from '../../middlewares/ValidateRequest';

// Routes
router.get('/', roleController.index);
router.get('/create', roleController.create);
router.post('/create', roleValidator.handle(), validateRequest.handle, roleController.store);
router.get('/:id/edit', roleController.edit);
router.put('/:id', roleValidator.handle(), validateRequest.handle, roleController.update);
router.delete('/:id', roleController.destroy);

export {router as rolesRouter};
