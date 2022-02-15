// interfaces
import {AdminPageInterface} from './interfaces/AdminPageInterface'

// Packages
import express from 'express';
import translate from '../../helpers/translate';

// Controllers
import Controller from './Controller';
// Service
import permissionService from '../../services/PermissionService';
// Message Handling

class PermissionController extends Controller implements AdminPageInterface {

    async index(req: any, res: any, next: any) {
        try {
            // Page Title
            const title: string = translate(req,__filename,'page-title-index','Permissions');
            // Paginate
            let page = req.query.page || 1;
            // Select All Permissions
            let permissions = await permissionService.paginate({}, page, {createdAt: 1}, 20);
            res.render('home/permissions', {permissions,title});
        } catch (e) {
            next(e);
        }
    }

    create(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    destroy(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    edit(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    store(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    update(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }
}

export default new PermissionController();
