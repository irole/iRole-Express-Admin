import Service from './Service';
import ResetPasswordToken from '../models/resetPasswordToken';

class ResetPasswordTokenService extends Service {

    constructor() {
        super(ResetPasswordToken);
    }

    async tokenUsed(token) {
        return await this.findOneAndUpdate({token}, {use: true});
    }

}

export default new ResetPasswordTokenService();
