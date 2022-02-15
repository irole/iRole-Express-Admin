import fs from 'fs';

const en = require('../resource/lang/en.json');

const autoBind = require('auto-bind');
const path = require('path');
const moment = require('moment');

module.exports = class Helper {
    req: any;
    inputValue: any;
    inputError: any;
    globalError: any;

    constructor(req: any) {
        autoBind(this);
        this.req = req;
        this.inputValue = req.flash('input_value')[0];
        this.inputError = req.flash('input_errors')[0];
        this.globalError = req.flash('global_error')[0];
    }

    getObject() {
        return {
            req: this.req,
            viewPath: this.viewPath,
            hasPermission: this.hasPermission,
            isValid: this.isValid,
            getInputValue: this.getInputValue,
            showError: this.showError,
            Date: this.Date,
            globalError: this.globalError,
            translate: this.translate,
            getSiteName : this.getSiteName

        };
    }

    getSiteName(){
        return Option['siteName'];
    }

    translate(req, path, key, value) {

        let address = path.replace(process.cwd(), '')
            .replace(/[\\]/g, '.')
            .substring(1);
        address = address.substring(0, address.length - 4);

        address = `${address}.${key}`;

        req.__(`${address}:${value}`);
        if (req.__l(address)[0] !== value) {
            let data: any = fs.readFileSync('./resource/lang/en.json');
            let json: any = JSON.parse(data);
            this.setValue(json, address, value);
            fs.writeFileSync('./resource/lang/en.json', JSON.stringify(json, null, 2));

            return req.__(address);
        }

        //req.__(`${address}:${value}`);
        return req.__(address);

    }

    setValue(object, path, value) {
        let way = path.replace(/\[/g, '.')
                .replace(/\]/g, '')
                .split('.'),
            last = way.pop();

        way.reduce(function (o, k, i, kk) {
            return o[k] = o[k] || (isFinite(i + 1 in kk ? kk[i + 1] : last) ? [] : {});
        }, object)[last] = value;
    }

    viewPath(dir: any) {
        return path.resolve(Option['layout'].view_dir + '/' + dir);
    }

    isValid(inputName: any) {
        if (this.inputError) {
            if (this.inputError[inputName]) return 'is-invalid';
            return '';
        }
    }

    getInputValue(inputName: any, defaultValue = '') {
        return this.inputValue && this.inputValue.hasOwnProperty(inputName) ? this.inputValue[inputName] : defaultValue;
    }

    showError(error: any) {
        if (this.inputError) {
            return this.inputError[error];
        }
    }

    hasPermission(permission: string) {
        if (!this.req.userPermissions.includes(permission)) return 'd-none';
    }

    Date(time: any) {
        return moment(time);
    }

};
