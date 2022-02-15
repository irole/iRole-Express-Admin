import Service from './Service';
import Role from '../models/role';

class RoleService extends Service {

    constructor() {
        super(Role);
    }
}

export default  new RoleService();
