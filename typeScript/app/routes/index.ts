// Packages
import express from 'express';

const i18n = require('i18n');
// MiddleWares
import language from '../middlewares/Language';
import redirectIfNotAdmin from '../middlewares/RedirectIfNotAdmin';
import errorHandling from '../middlewares/ErrorHandling';

const router = express.Router();

// Routes
import {publicRouter} from './public';
import {privateRouter} from './private';

// Translate Config
router.use(language.handle);
router.get('/lang/:lang', (req: any, res: any) => {
    const {lang} = req.params;
    if (i18n.getLocales().includes(lang)) {
        res.cookie('lang', lang, {
            maxAge: 1000 * 60 * 60 * 24 * 90,
            signed: true
        });
    }

    res.redirect(req.header('Referer') || '/');
});
// Routes
router.use('/', publicRouter);
router.use('/', redirectIfNotAdmin.handle, privateRouter);

// Error 404
router.all('*', errorHandling.error404);
// Error Handling
router.use(errorHandling.handler);

export {router as Router};
