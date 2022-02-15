// Packages
import express from 'express';

const router = express.Router();
// Controllers
import homeController from '../../controllers/home/HomeController';

// Routes
router.get('/', homeController.index);

export {router as homeRouter};
