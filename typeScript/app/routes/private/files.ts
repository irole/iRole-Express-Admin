// Packages
import express from 'express';

const router = express.Router();
// Controllers
import fileController from '../../controllers/home/FileController';
// Validators
import fileValidator from '../../validators/private/FileValidator';
// Helpers
import uploadImage from '../../helpers/uploadImages';
// Middlewares
import convertFileToField from '../../middlewares/ConvertFileToField';
import validateRequest from '../../middlewares/ValidateRequest';

router.get('/', fileController.index);
router.get('/upload', fileController.create);
router.post('/upload', uploadImage.single('file'), convertFileToField.handle, fileValidator.handle(), fileController.store);
router.get('/:id/edit', fileController.edit);
router.put('/:id/edit', fileController.update);
router.delete('/:id', fileController.destroy);

export {router as fileRouter};
