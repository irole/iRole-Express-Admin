// Packages
import {body} from 'express-validator';
import translate from '../../../helpers/translate';
// Validators
import {Validator} from '../../Validator';
class ForgotPasswordValidator extends Validator {

    handle() {
        return [
            body('email')
                .trim()
                .escape()
                .isEmail()
                .withMessage((value, {
                    req,
                    location,
                    path
                }) => {
                    return translate(req, __filename, 'email-validate', 'email not valid');
                }),
        ];
    }
}

export default new ForgotPasswordValidator();
