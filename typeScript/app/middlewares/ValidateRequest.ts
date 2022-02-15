// Middleware
import Middleware from './Middleware';
// Message Handling
import {ValidationMessage} from '../validators/ValidationMessage';

class ValidateRequest extends Middleware {
    // Check User Authenticated
    async handle(req: any, res: any, next: any) {
        // Validation Process
        const result = await new ValidationMessage().handle(req);
        // Have Error
        if (result) {
            // Send Input Value to req.body with Flash
            req.flash('input_value', req.body);
            // Redirect to Current Page and if not Exist Redirect to Main Page
            return res.redirect(req.header('Referer') || '/');
        }
        next();
    }
}

export default new ValidateRequest();
