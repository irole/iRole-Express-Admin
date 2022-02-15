// Packages
import express from 'express';

const router = express.Router();
// Controllers
import permissionController from '../../controllers/home/PermissionController';
// Routes
router.get('/', permissionController.index);

export {router as permissionRouter};
