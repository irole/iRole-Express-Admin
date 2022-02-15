// interfaces
import {AdminPageInterface} from './interfaces/AdminPageInterface';

// Packages
import express from 'express';
import fs from 'fs';
import translate from '../../helpers/translate';

const config = require('config');
// Controllers
import Controller from './Controller';
// Service
import fileService from '../../services/FileService';
// Validators
import {ValidationMessage} from '../../validators/ValidationMessage';

class FileController extends Controller implements AdminPageInterface {
    async index(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Files');
            let siteUrl = `${config.WebsiteUrl}`;
            // Paginate
            let page = req.query.page || 1;
            // Select All File
            let files = await fileService.paginate({}, page, {createdAt: 1}, 5);
            res.render('home/files', {
                title,
                files,
                siteUrl
            });
        } catch (e) {
            next(e);
        }
    }

    create(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-create', 'Upload new File');
            res.render('home/files/upload', {title});
        } catch (e) {
            next(e);
        }
    }

    async store(req, res, next) {
        try {
            // Validation Process
            let result = await new ValidationMessage().handle(req);
            // Have Error
            if (result) {
                // Delete Image When Exist
                if (req.file) fs.unlinkSync(req.file.path);
                return this.back(req, res);
            }
            // Get Input Value
            let {
                title,
                size,
                type,
                url,
                originalName
            } = req.body.file;
            let slug = await this.slug(title);
            // --------------Create New File ------------------
            let file = await fileService.insert({
                title,
                slug,
                size,
                type,
                url,
                originalName,
            });
            //-------------------------------------------------------
            res.redirect(`/files/${file._id}/edit`);
        } catch (e) {
            next(e);
        }
    }

    async edit(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-edit', 'Edit File');
            let siteUrl = `${config.WebsiteUrl}${config.ApplicationPort}`;
            // Select file by Course id
            let file = await fileService.findById(req.params.id);
            // Check file is Exist
            if (!file) this.error(translate(req, __filename, 'not-found-edit', 'File not exist !'), 404);
            res.render('home/files/edit', {
                title,
                file,
                siteUrl
            });
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            let objForUpdate: any = {};
            // Select File
            let file = await fileService.findById(req.params.id);
            // Check file is Exist
            if (!file) this.error(translate(req, __filename, 'not-found-update', 'File not exist !'), 404);
            // Get Input Value
            let {
                title,
                shortDescription,
                description,
                alt
            } = req.body;
            // Create Slug with Title
            objForUpdate.slug = await this.slug(title);
            // Find and Update with File Id
            await fileService.findByIdAndUpdate(req.params.id, {
                $set: {
                    title,
                    shortDescription,
                    description,
                    alt,
                    ...objForUpdate
                }
            });
            return res.redirect('/files');
        } catch (e) {
            next(e);
        }
    }

    async destroy(req, res, next) {
        try {
            // Get Delete Confirm from Ajax
            if (req.body.deleteConfirm) {
                // Check File Id
                //this.isMongoId(req.params.id);
                // Select Course Where File Id via episodes & comments & sections
                let file = await fileService.findById(req.params.id);
                // Check File is Exist
                if (!file) this.error(translate(req, __filename, 'not-found-destroy', 'File not exist !'), 404);
                //--------------Delete Images ------------------
                fs.unlinkSync(`./public${file.url}`);
                //------------------------------------------------
                // Delete course
                await file.remove();
                // Response to Ajax
                res.json({delete: true});
            } else { // Show Sweet Alert
                return this.alertDelete(req, res, {
                    text: 'are you sure ?'
                });
            }
        } catch (e) {
            next(e);
        }
    }

    async slug(title) {
        return title.replace(/([^۰-۹آ-یA-Za-z0-9]|-)+/g, '-');
    }
}

export default new FileController();
