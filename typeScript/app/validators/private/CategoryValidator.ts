import express from 'express';
import translate from '../../helpers/translate';

const {body} = require('express-validator');

// Validators
import {Validator} from '../Validator';
import categoryService from '../../services/CategoryService';
import fileService from '../../services/FileService';

class CategoryValidator extends Validator {

    handle() {
        return [
            body('name')
                .not()
                .isEmpty()
                .trim()
                .escape()
                .withMessage((value, {req}) => {
                    return translate(req, __filename, 'category-name', 'Category Name Must enter');
                })
                .custom(async (value: any, {req}) => {
                    if (req.query._method === 'put') {
                        let category = await categoryService.findById(req.params.id);
                        if (category.name === value) return;
                    }

                    let category = await categoryService.findOne({name: value});
                    if (category) {
                        throw new Error(translate(req, __filename, 'category-exist', 'One Category with This name Exist'));
                    }
                }),
            body('parent')
                .not()
                .isEmpty()
                .withMessage((value, {req}) => {
                    return translate(req, __filename, 'parent-blank', 'The parent field cannot be left blank');
                }),
            body('lang')
                .custom(async (value: any, {req}) => {
                    if (!req.getLocales()
                        .includes(value)) {
                        throw new Error(translate(req, __filename, 'lang-not-valid', 'please select valid Language'));
                    }
                }),
            body('image')
                .custom(async (value, {req}) => {
                    if (value == '') throw new Error(translate(req, __filename, 'cate-img-required', 'Category Image is Required ! '));
                    let file = await fileService.findById(value);
                    if (!file) throw new Error(translate(req, __filename, 'image-not-exist', 'selected picture not exist'));
                }),
            body('imageUrl')
                .custom(async (value, {req}) => {
                    if (value == '') throw new Error(translate(req, __filename, 'cate-img-url-required', 'Category Image is Required ! '));
                    let file = await fileService.find({url: value});
                    if (!file) throw new Error(translate(req, __filename, 'image-url-not-exist', 'selected picture not exist'));
                }),
        ];
    }
}

export default new CategoryValidator();
