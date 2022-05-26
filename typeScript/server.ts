// Packages
import express from 'express';
import flash from 'connect-flash';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const config = require('config');
const passport = require('passport');
const i18n = require('i18n');
const logger = require('morgan');
const compression = require('compression');
const methodOverride = require('method-override');
const csrf = require('csurf');
const path = require('path');
const favicon = require('express-favicon');

const app = express();
require('dotenv').config();
// Helper
const Helper = require('./Helper');
// Middlewares
import csrfErrorHandler from './app/middlewares/CsrfErrorHandler';
import rememberLogin from './app/middlewares/RememberLogin';
// Routes
import {Router} from './app/routes/index';

export class Server {

    constructor() {
        this.setConfig();
        this.setRoutes();
    }

    setConfig() {
        global.Option = require('./option');
        //if (process.env.NODE_ENV === 'development') app.use(logger('dev'));
        // Passport
        require('./app/passport/passport-local');
        //require('./app/passport/passport-google');
        // Enable Trust Proxy for web apps e.g. nginx
        // app.enable('trust proxy');

        // Helmet Config
        app.use(helmet({
            referrerPolicy: false,
            contentSecurityPolicy: false,
        }));
        // Set Public Directory
        app.use(express.static(Option['layout'].public_dir));
        // Set View Engine
        app.set('view engine', Option['layout'].view_engine);
        // Set Directory for View Engine
        app.set('views', Option['layout'].view_dir);
        // Set EJS Layouts
        app.use(Option['layout'].ejs.expressLayouts);
        //  Extract <script> in EJS Layout
        app.set('layout extractScripts', Option['layout'].ejs.extractScripts);
        //  Extract <style> in EJS Layout
        app.set('layout extractStyles', Option['layout'].ejs.extractStyles);
        // Set Master EJS Layout
        app.set('layout', Option['layout'].ejs.master);
        // Set favicon
        app.use(favicon(path.resolve(process.cwd() + '/public/favicon.png')));
        // Input Post Values to req.body
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        // Setup Session
        app.use(session(Option['session']));
        // Set Cookie in req.cookie
        app.use(cookieParser(process.env.COOKIE_SECRETKEY));
        // Setup req.flash
        app.use(flash());
        // Add PUT & DELETE Methods to Post Urls
        app.use(methodOverride('_method'));
        // Passport Initialize
        app.use(passport.initialize());
        app.use(passport.session());
        // gzip compression
        app.use(compression());
        // Translate Config
        i18n.configure({
            locales: ['en'],
            directory: Option['layout'].locales_directory,
            defaultLocale: 'en',
            cookie: 'lang',
            objectNotation: true,
            updateFiles: true,
        });
        app.use(i18n.init);
        // Setup Helper
        app.use((req: any, res: any, next: any) => {
            app.locals = new Helper(req, res).getObject();
            next();
        });
        app.use(rememberLogin.handle);
    }

    setRoutes() {
        app.use(csrf({cookie: true}), csrfErrorHandler.handle, Router);
    }
}

export {app};
