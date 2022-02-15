// Middleware
import Middleware from './Middleware';
import translate from "../helpers/translate";

class CsrfErrorHandler extends Middleware {
    // Check CSRF (Use form just by application Form)
    async handle(err: any, req: any, res: any, next: any) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err);

        // handle CSRF token errors here
        res.status(403);
        res.send(translate(req,__filename,'csrf-error','CSRF Token Not Found !'));
    }
}

export default new CsrfErrorHandler();
