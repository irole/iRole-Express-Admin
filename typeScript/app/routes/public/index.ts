// Packages
import express from 'express';
// Middlewares
import redirectIfAuthenticated from '../../middlewares/RedirectIfAuthenticated';
// Routes
import {introRouter} from './intro';
import {authRouter} from './auth';

const router = express.Router();

router.get('/logout', (req: any, res: any) => {
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/');
});
router.use('/auth', redirectIfAuthenticated.handle, authRouter);
router.use('/intro', introRouter);

export {router as publicRouter};
