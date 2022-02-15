const config = require('config');
// Middleware
import Middleware from './Middleware';
// Logger
import logger from '../helpers/logger';
import translate from "../helpers/translate";

class ErrorHandling extends Middleware {
    // Define 404 Error
    error404(req: any, res: any, next: any) {
        try {
            const error: any = new Error(translate(req,__filename,'not-found','Not Found !'));
            error.status = 404;
            throw error;
        } catch (e) {
            next(e);
        }
    }

    // Define Another Error
    handler(err: any, req: any, res: any, next: any) {
        const statusCode = err.status || 500;
        const message = err.message || '';
        const stack = err.stack || '';
        const layouts = {
            layout: 'master',
        };
        logger.error(`${statusCode || 500} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        // if (config.debug) return res.render('errors/stack', {...layouts, message, stack});
        return res.status(statusCode).render(`errors/${statusCode}`, {...layouts, message, stack});
    }
}

export default new ErrorHandling();
