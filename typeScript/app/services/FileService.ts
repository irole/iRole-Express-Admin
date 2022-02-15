import Service from './Service';
import File from '../models/file';

class FileService extends Service {

    constructor() {
        super(File);
    }

    async findAllPictures() {
        const fileExt = Option['fileExt'].ext;
        return await this.find({type: [...fileExt]});
    }
}

export default new FileService();
