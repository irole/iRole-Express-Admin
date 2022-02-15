import Service from './Service';
import Category from '../models/category';


class CategoryService extends Service {
    arrangeName: any = [];
    arrangeCategory: any = [];
    unSort: any = [];

    constructor() {
        super(Category);
    }

    // Sort Categories(ONLY MAIN CATEGORIES)
    async sort(categories: any) {
        this.arrangeName = [];
        this.arrangeCategory = [];
        // Get all Main Categories
        categories.forEach((main: any) => {
            // Check arrangeName for Category
            if (!this.arrangeName.includes(main.name)) {
                // Push Category Name to arrangeName
                this.arrangeName.push(main.name);
                // Push Category to arrangeCategory
                this.arrangeCategory.push(main);
            }
            // Check Child Is Exist
            if (main.childs) {

                //---------------------Get All Child Category -------------------
                main.childs.forEach((child: any) => {

                    // Search Parent Name in arrangeName
                    if (this.arrangeName.includes(child.parent.name)) { // Parent Exist in arrangeName
                        // Push Arranged Childs to Array
                        let parentIndex = this.arrangeName.indexOf(child.parent.name);
                        this.arrangeName.splice(parentIndex + 1, 0, child.name);
                        this.arrangeCategory.splice(parentIndex + 1, 0, child);
                    } else { // Parent not Exist in arrangeName
                        // Search Child Name in unSort
                        if (!this.unSort.includes(child.name)) this.unSort.push(child);
                    }
                });
                // -------------------------------------------------------------------------

                //--------------------- Check & Sort unSort Categories ----------------------------
                while (this.unSort.length != 0) {
                    this.unSort.forEach((child: any) => {
                        // Search Parent Name in arrangeName
                        if (this.arrangeName.includes(child.parent.name)) { // Parent Exist in arrangeName
                            // Push Arranged unSort to Array
                            let parentIndex = this.arrangeName.indexOf(child.parent.name);
                            if (!this.arrangeName.includes(child.name)) {
                                this.arrangeName.splice(parentIndex + 1, 0, child.name);
                                this.arrangeCategory.splice(parentIndex + 1, 0, child);
                            }
                            // Delete Founded Child from unSort
                            let index = this.unSort.findIndex((x: any) => x.name === child.name);
                            this.unSort.splice(index, 1);
                        } else { // Parent not Exist in arrangeName
                            // Search Child Name in unSort
                            if (!this.unSort.includes(child.name)) this.unSort.push(child);
                        }
                    });
                }
                // -------------------------------------------------------------------------

            }
        });
        return this.arrangeCategory;
    }

    // Return sorted Categories
    async getSortCategories() {
        // Select Main Categories
        const populate: any = [{
            path: 'childs',
            populate: [{
                path: 'parent',
                select: 'name'
            }, {
                path: 'image',
                select: 'url'
            }],
            options: {sort: {createdAt: -1}},
        }, {
            path: 'image',
            select: 'url'
        }];
        const query = await this.find({parent: null}, populate, {createdAt: 1});
        // Sort Categories
        return await this.sort(query);
    }
}

export default new CategoryService();
