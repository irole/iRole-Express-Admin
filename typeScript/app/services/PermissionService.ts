import Service from './Service';
import Permission from '../models/permission';


class PermissionService extends Service {

    constructor() {
        super(Permission);
    }

}

export default new PermissionService();
