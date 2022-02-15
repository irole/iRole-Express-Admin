import Service from './Service';
import Article from '../models/article';

class ArticleService extends Service {

    constructor() {
        super(Article);
    }
}

export default new ArticleService();
