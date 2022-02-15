const path = require('path');

// Middleware
import Middleware from './Middleware';

class ConvertFileToField extends Middleware {
    // Put req.file Information in filename & size
    handle(req: any, res: any, next: any) {

        if (!req.file) {
            req.body.file = undefined;
        } else {
            const fileInfo = path.parse(req.file.originalname);
            const type = fileInfo.ext.substring(1);
            const title = fileInfo.name;
            const url = `${req.file.destination.substr(8)}/${req.file.filename}`;
            const originalNameInfo = path.parse(req.file.filename);
            const originalName = originalNameInfo.name;

            req.body.file = {
                title,
                size: req.file.size,
                type,
                url,
                originalName
            };
        }
        next();
    }
}

export default new ConvertFileToField();
