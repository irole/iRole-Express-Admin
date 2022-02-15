// Packages
import translate from "../helpers/translate";

const autoBind = require('auto-bind');
const bcrypt = require('bcrypt');

export default class MasterController {

    arrangeName: any = [];
    arrangeCategory: any = [];
    unSort: any = [];

    constructor() {
        autoBind(this);
    }

    back(req, res) {
        // Send Input Value to req.body with Flash
        req.flash('input_value', req.body);
        // Redirect to Current Page and if not Exist Redirect to Main Page
        return res.redirect(req.header('Referer') || '/');
    }

    error(message, statusCode: number = 500) {
        // Define New Error with Message
        const error: any = new Error(message);
        // Define Error Status Code
        error.status = statusCode;
        throw error;
    }

    // Sweet Alert Config For Delete
    alertDelete(req: any, res: any, data: any = {}) {
        const title = data.title || translate(req,__filename,'alert-delete-title','Warning !');
        const text = data.text || translate(req,__filename,'alert-delete-text','It is impossible to recycle after deletion');
        const icon = data.icon || 'warning';
        const confirmButtonText = data.confirmButtondText || translate(req,__filename,'alert-delete-confirm-button','yes');
        const cancelButtonText = data.cancelButtonText || translate(req,__filename,'alert-delete-cancel-button','cancel');
        const boxTime = data.boxTime || 6000;
        const ID = req.params.id;
        req.flash('sweetalert', {
            title,
            text,
            icon,
            confirmButtonText,
            cancelButtonText,
            boxTime,
            ID
        });
        this.back(req, res);
    }

    // Sweet Alert Config
    alert(req: any, data: any = {}) {
        const title = data.title || '',
            text = data.text || '',
            icon = data.icon || 'info',
            button = data.button || null,
            timer = data.timer || 2000;

        req.flash('sweetalert', {
            title,
            text,
            icon,
            button,
            timer
        });
    }

    alertAndBack(req, res, data: any = {}) {
        this.alert(req, data);
        this.back(req, res);
    }

    bcryptPassword(password: any): any {
        // Bcrypt with 15 salt
        const salt = bcrypt.genSaltSync(15);
        // Bcrypt Password with Salt
        return bcrypt.hashSync(password, salt);
    }
};
