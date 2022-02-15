import translate from '../../helpers/translate';

const {body} = require('express-validator');

// Validators
import {Validator} from '../Validator';
import articleService from '../../services/ArticleService';
import fileService from '../../services/FileService';

class ArticleValidator extends Validator {
    handle() {
        return [
            body('title')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value.length < 5) throw new Error(translate(req, __filename, 'article-title-length', 'Article Title Must More Than 5 Characters'));
                    if (req.query._method === 'put') {
                        let coinBox = await articleService.findById(req.params.id);
                        if (coinBox.title === value) return;
                    }
                    let coinBox = await articleService.findOne({slug: this.slug(value)});
                    if (coinBox) throw new Error(translate(req, __filename, 'article-exist', 'this Article Exist'));
                }),
            body('image-url'),
            body('image')
                .custom(async (value, {req}) => {
                    if (value == '') throw new Error(translate(req, __filename, 'image-required', 'image is Required'));
                    let file = await fileService.findById(value);
                    if (!file) throw new Error(translate(req, __filename, 'image-not-exist', 'This Image not Exist'));
                }),
            body('categories')
                .custom(async (value, {req}) => {
                }),
            body('body')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value.length < 5) throw new Error(translate(req, __filename, 'description-length', 'Description Must More Than 10 Characters '));
                }),
            body('lang')
                .custom(async (value: any, {req}) => {
                    if (!req.getLocales()
                        .includes(value)) {
                        throw new Error(translate(req, __filename, 'lang-not-valid', 'please select valid Language'));
                    }
                }),
            body('tags')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                })
        ];
    }

    slug(title: any) {
        return title.replace(/([^۰-۹آ-یA-Za-z0-9]|-)+/g, '-');
    }
}

export default new ArticleValidator();
