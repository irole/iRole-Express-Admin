import translate from '../../helpers/translate';

const {body} = require('express-validator');
// Validators
import {Validator} from '../Validator';
import RoleService from '../../services/RoleService';


class RoleValidator extends Validator {

    handle() {
        return [
            body('name')
                .isLength({min: 3})
                .trim()
                .escape()
                .withMessage((value, {req}) => translate(req,__filename,'name','name must more than 3 characters'))
                .bail()
                .custom(async (value: any, {req}) => {
                    let role;
                    if (req.query._method === 'put') {
                        role = await RoleService.findById(req.params.id);
                        if (role.name === value) return;
                    }
                    role = await RoleService.findOne({name: value});
                    if (role) throw new Error(translate(req,__filename,'role-exist','this name Exist !'));
                }),


            body('label')
                .isLength({min: 3})
                .trim()
                .escape()
                .withMessage((value, {req}) => translate(req,__filename,'label','label must more than 3 characters')),

            body('lang')
                .custom(async (value: any, {req}) => {
                    if (!req.getLocales().includes(value)) throw new Error(translate(req,__filename,'lang-not-valid','please select valid Language'));
                }),
            body('permissions')
                .not()
                .isEmpty()
                .withMessage((value, {req}) => translate(req,__filename,'permissions','you must choose permissions'))
        ];
    }

}

export default  new RoleValidator();
