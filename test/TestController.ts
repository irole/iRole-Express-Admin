import express from "express";
// Packages
const chai = require('chai');
const assert = chai.assert;
const autoBind = require('auto-bind');
let chaiHttp = require('chai-http');

// Middleware
chai.use(chaiHttp);

class TestController {

    constructor() {
        autoBind(this);
    }

}

module.exports = new TestController();
