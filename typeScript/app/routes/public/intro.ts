// Packages
import express from 'express';

const router = express.Router();
// Controllers
import installerController from '../../controllers/InstallerController';
// Routes
router.get('/', installerController.index);
router.get('/installer', installerController.installer);

export {router as introRouter};
