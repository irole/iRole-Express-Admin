// Packages
import express from 'express';

const router = express.Router();

// Controllers
import articleController from '../../controllers/home/ArticleController';
// Validators
import articleValidator from '../../validators/private/ArticleValidator';
// Middlewares
import validateRequest from '../../middlewares/ValidateRequest';

router.get('/', articleController.index);
router.get('/create', articleController.create);
router.post('/create', articleValidator.handle(), validateRequest.handle, articleController.store);
router.delete('/:id', articleController.destroy);
router.get('/:id/edit', articleController.edit);
router.put('/:id', articleValidator.handle(), validateRequest.handle, articleController.update);

export {router as articleRouter};
