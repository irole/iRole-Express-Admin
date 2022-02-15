// Packages
import express from 'express';
// Routes
import {homeRouter} from './home';
import {permissionRouter} from './permissions';
import {rolesRouter} from './roles';
import {fileRouter} from './files';
import {userRouter} from './users';
import {categoryRouter} from './categories';
import {articleRouter} from './articles';

const router = express.Router();

// Middlewares
import userPermission from '../../middlewares/UserPermission';

router.use(userPermission.handle);
// change master layouts
router.use((req: any, res: any, next: any) => {
    res.locals.layout = 'home/master';
    next();
});

// Routes
router.use('/', homeRouter);
router.use('/permissions', permissionRouter);
router.use('/roles', rolesRouter);
router.use('/files', fileRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/articles', articleRouter);

export {router as privateRouter};
