import {body} from "express-validator";
import translate from '../../helpers/translate';

// Validators
import {Validator} from '../Validator';

class FileValidator extends Validator {
    handle() {
        return [
            body('file').custom(async (value, {req}) => {
                // @ts-ignore
                if (req.query._method === 'put' && value === undefined) return;

                if (!value)
                    throw new Error(translate(req, __filename, 'file-required', 'you must insert file for upload '));
                let fileExt = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'svg', 'SVG', "mkv", "mp4", "mpeg", "MKV", "MP4", "MPEG", "MP3", "mp3", "FLAC", "flac", "WAV", "wav", "doc", "DOC", "docx", "DOCX", "ppt", "PPT", "pptx", "PPTX", "txt", "TXT", "pdf", "PDF", "rar", "RAR", "zip", "ZIP", "7z", "7Z"];
                if (!fileExt.includes(value.type))
                    throw new Error(translate(req, __filename, 'file-extension-not-valid', 'File extension is not acceptable'))
                // Limit
                if (value.size > 1024 * 1024 * 10) {
                    throw new Error(translate(req, __filename, 'size-limit', 'Maximum file size should be 10mb'));
                }
            }),
        ]
    }


}

export default new FileValidator();
