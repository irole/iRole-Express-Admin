import {validationResult} from 'express-validator';

const autoBind = require('auto-bind');
export class ValidationMessage {

    messages: any = {}

    constructor() {
        autoBind(this);
    }

    async handle(req: any) {
        const result = await validationResult(req).array();
        if (result.length > 0) { // Error
            result.forEach((item: any) => {
                this.messages[item.param] = item.msg;
            });
            await this.setMessage(req);
            return true;
        }
        return false;
    }

    setMessage(req: any) {
        req.flash('input_errors', this.messages);
    }
};
