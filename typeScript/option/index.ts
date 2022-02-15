const fileExt = require('./fileExt');
const layout = require('./layout');
const session = require('./session');
const httpStatus = require('./httpStatus');
const service = require('./service');
const permission = require('./permission');
const role = require('./role');

module.exports = {
    fileExt,
    layout,
    session,
    httpStatus,
    permission,
    service,
    role,
    siteName: 'iRole'
};
