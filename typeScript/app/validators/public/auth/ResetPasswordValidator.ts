import express from 'express';
// Packages
import {body} from 'express-validator';
import translate from '../../../helpers/translate';
// Validators
import {Validator} from '../../Validator';

class ForgotPasswordValidator extends Validator {

    handle() {
        return [
            body('password')
                .isLength({min: 8}).escape()
                .withMessage((value, {req, location, path}) => {
                    return translate(req,__filename,'password-valid','password must more than 8 characters');
                }),
        ];
    }
}

export default new ForgotPasswordValidator();
