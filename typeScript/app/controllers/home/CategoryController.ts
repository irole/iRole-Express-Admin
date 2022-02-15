import translate from '../../helpers/translate';
// Controllers
import Controller from './Controller';

// Message Handling
//const validationMessage = require("app/http/validators/ValidationMessage");
// Service
import categoryService from '../../services/CategoryService';
import fileService from '../../services/FileService';

// Interface
interface AdminInterface {
    index(req, res, next);
}

class CategoryController extends Controller {

    async index(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Categories');
            // Get Sort Categories
            const categories = await categoryService.getSortCategories();
            res.render('home/categories', {
                title,
                categories
            });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-create', 'Create Category');
            // Get Sort Categories
            const images = await fileService.find({type: [...Option['fileExt'].ext]});
            const categories = await categoryService.getSortCategories();
            res.render('home/categories/create', {
                title,
                categories,
                images
            });
        } catch (e) {
            next(e);
        }
    }

    async store(req, res, next) {
        try {
            // Get Input Value
            const {
                name,
                parent,
                lang,
                image,
                description
            } = req.body;
            if (parent == 'none') {
                // Create New Category
                categoryService.insert({
                    name,
                    lang,
                    image,
                    description
                });
            } else { //  When Category Have Parent
                // Find Parent From Categories
                const parentCategory = await categoryService.findById(parent);
                // If Parent Not Exist
                if (!parentCategory) this.error(translate(req, __filename, 'not-found-store', 'parent not found'), 404);
                // All Parent Categories Push to Current Categories
                let categories = parentCategory.categories;
                // Push Parent to Current Categories
                categories.push(parent);
                // Create New Category
                await categoryService.insert({
                    name,
                    parent,
                    categories,
                    lang,
                    image,
                    description
                });
            }
            return res.redirect('/categories');
        } catch (err) {
            next(err);
        }
    }

    async edit(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-edit', 'Edit Category');
            // Select Category by Category id
            const category = await categoryService.findById(req.params.id, ['childs', {
                path: 'image',
                select: 'url'
            }]);
            // Check Category is Exist
            if (!category) this.error(translate(req, __filename, 'not-found-edit', 'this category not found !'), 404);
            let childsName: any = [];
            // Push Main Category Name to childsName
            childsName.push(category.name);
            // Push Childs Category to childsName
            if (category.childs) {
                category.childs.forEach((child: any) => childsName.push(child.name));
            }

            // Get Sort Categories
            const sortCategories = await categoryService.getSortCategories();
            // Filter Own & Childs Categories
            let categories = sortCategories.filter((item) => {
                if (!childsName.includes(item.name)) return item;
            });
            // return  res.json(categories)
            const images = await fileService.find({type: [...Option['fileExt'].ext]});
            return res.render('home/categories/edit', {
                title,
                category,
                categories,
                images
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            // Get Input Value
            const {
                name,
                parent,
                lang,
                image,
                description
            } = req.body;
            let parentCategories: any;
            // Main Category
            if (parent == 'none') {
                await categoryService.findByIdAndUpdate(req.params.id, {
                    $set: {
                        name,
                        parent: null,
                        lang,
                        image,
                        description,
                        categories: []
                    }
                });
            } else {// Category Have Parent
                // Select Parent Category
                const parentCategory = await categoryService.findById(parent);
                // Parent not Exist
                if (!parentCategory) this.error(translate(req, __filename, 'not-found-parent-update', 'parent not found'), 404);
                // All Parent Categories Push to parentCategories
                parentCategories = parentCategory.categories;
                // Push Parent to parentCategories
                parentCategories.push(parent);
                // Find and Update with Category Id
                await categoryService.findByIdAndUpdate(req.params.id, {
                    $set: {
                        name,
                        parent,
                        image,
                        description,
                        lang,
                        categories: parentCategories
                    }
                });
            }
            //--------------Update Childs ------------------
            // Select Category with Category Id via Childs
            const category = await categoryService.findById(req.params.id, 'childs');
            // Category not Exist
            if (!category) this.error('not found', 404);
            if (!category) this.error(translate(req, __filename, 'not-found-category-update', 'this category not found !'), 404);

            // Category Have Childs
            if (category.childs.length > 0) {
                // Get Each Childs of Category
                for (const child of category.childs) {

                    let childCategories: any;
                    // Select Category Where Parent's Child
                    let newParent = await categoryService.findById(child.parent);
                    // All Childs Parent Categories Push to childCategories
                    childCategories = newParent.categories;
                    // Push Childs Parent to childCategories
                    childCategories.push(child.parent);
                    // Find and Update with Child Id
                    await categoryService.findByIdAndUpdate(child.id, {
                        $set: {
                            categories: childCategories
                        }
                    });
                }
            }
            //-------------------------------------------

            return res.redirect('/categories');
        } catch
            (e) {
            next(e);
        }
    }

    async destroy(req, res, next) {
        try {
            // Get Delete Confirm from Ajax
            if (req.body.deleteConfirm) {
                // Select Category by Category id
                let category = await categoryService.findById(req.params.id, 'childs');
                // Check Category is Exist
                if (!category) this.error(translate(req, __filename, 'not-found-destroy', 'this category not found !'), 404);

                // Delete Childs
                if (category.childs) {
                    await category.childs.forEach((category: any) => category.remove());
                }
                // Delete Category
                await category.remove();
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

}

export default new CategoryController();
