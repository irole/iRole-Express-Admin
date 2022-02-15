// Middleware
import Middleware from './Middleware';
const i18n = require('i18n');

class Language extends Middleware {
    // Check website language
    handle(req: any, res: any, next: any) {
        try {
            const {lang} = req.signedCookies;
            if (req.getLocales().includes(lang)) req.setLocale(lang);
            else req.setLocale(req.getLocale());

            next();
        } catch (err) {
            next(err);
        }
    }
}

export default new Language();
