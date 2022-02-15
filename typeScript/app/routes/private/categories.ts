// Packages
import express from 'express';

const router = express.Router();

// Controllers
import CategoryController from '../../controllers/home/CategoryController';
// Middlewares
import validateRequest from '../../middlewares/ValidateRequest';
// validators
import CategoryValidator from '../../validators/private/CategoryValidator';

router.get('/', CategoryController.index);
router.get('/create', CategoryController.create);
router.post('/create', CategoryValidator.handle(), validateRequest.handle, CategoryController.store);
router.get('/:id/edit', CategoryController.edit);
router.put('/:id', CategoryValidator.handle(), validateRequest.handle, CategoryController.update);
router.delete('/:id', CategoryController.destroy);

export {router as categoryRouter};
