// interfaces
import {AdminPageInterface} from './interfaces/AdminPageInterface';

// Packages
import translate from '../../helpers/translate';
// Controllers
import Controller from './Controller';
// Models

// Service
import categoryService from '../../services/CategoryService';
import fileService from '../../services/FileService';
import articleService from '../../services/ArticleService';

// Message Handling

class ArticleController extends Controller implements AdminPageInterface {
    async index(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Articles');
            // Paginate
            let page = req.query.page || 1;
            // Select All File
            const populate = [{
                path: 'author',
                select: 'email'
            }, {path: 'image'}];
            const articles = await articleService.paginate({}, page, {createdAt: 1}, 5, populate);
            res.render('home/articles', {
                title,
                articles
            });
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const title: string = translate(req, __filename, 'page-title-create', 'create new Article');
            const user = req.user;
            const categories = await categoryService.getSortCategories();
            const images = await fileService.findAllPictures();
            res.render('home/articles/create', {
                title,
                user,
                images,
                categories
            });
        } catch (e) {
            next(e);
        }
    }

    async store(req, res, next) {
        try {
            // Get Input Value
            const {
                title,
                body,
                tags,
                categories,
                image,
                lang
            } = req.body;
            const slug = await this.slug(title);
            // --------------Create New Article ------------------
            await articleService.insert({
                author: req.user._id,
                title,
                slug,
                body,
                image,
                lang,
                tags,
                categories,
            });
            //-------------------------------------------------------
            return res.redirect('/articles/');
        } catch (e) {
            next(e);
        }
    }

    async edit(req, res, next) {
        try {
            // Select file by Course id
            const article = await articleService.findById(req.params.id, 'image');
            // Check file is Exist
            if (!article) this.error(translate(req, __filename, 'not-found-edit', 'this article Not Exist'), 404);
            // Get Sort Categories
            const categories = await categoryService.getSortCategories();
            // Select All Images from Files
            const images = await fileService.findAllPictures();
            res.render('home/articles/edit', {
                article,
                categories,
                images
            });
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            // Select File
            const article = await articleService.findById(req.params.id);
            // Check file is Exist
            if (!article) this.error(translate(req, __filename, 'not-found-update', 'this article not Exist'), 404);
            // Get Input Value
            let {
                title,
                body,
                tags,
                categories,
                image,
                lang
            } = req.body;
            // Create Slug with Title
            let slug = await this.slug(title);
            // Find and Update with File Id
            await articleService.findByIdAndUpdate(req.params.id, {
                $set: {
                    title,
                    slug,
                    body,
                    tags,
                    lang,
                    categories,
                    image,
                }
            });
            return res.redirect('/articles');
        } catch (e) {
            next(e);
        }
    }

    async destroy(req, res, next) {
        try {
            // Get Delete Confirm from Ajax
            if (req.body.deleteConfirm) {
                // Find Coin Box With Id
                let article = await articleService.findById(req.params.id);
                // Check File is Exist
                if (!article) this.error(translate(req, __filename, 'not-found-destroy', 'this article not Exist'), 404);
                // Delete course
                await article.remove();
                // Response to Ajax
                res.json({delete: true});
            } else { // Show Sweet Alert
                return this.alertDelete(req, res, {
                    text: translate(req, __filename, 'destroy-text-sweetalert', 'are you sure ? ')
                });
            }
        } catch (e) {
            next(e);
        }
    }

    async slug(title) {
        return title.replace(/([^۰-۹آ-یA-Za-z0-9]|-)+/g, '-');
    }
}

export default new ArticleController();
