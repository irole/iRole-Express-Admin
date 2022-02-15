// Controllers
import Controller from './Controller';
// Models

// Service

// Message Handling

class HomeController extends Controller {

    async index(req: any, res: any, next: any) {
        try {
            res.render('home/index');
        } catch (e) {
            next(e);
        }
    }
}

export default new HomeController();
