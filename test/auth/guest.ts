import express from "express";
// Packages
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
// Controller
const testController = require('../../TestController');

module.exports = function (server) {

    describe('/Guest', () => {

        describe('Post', () => {
            it('Success', async () => {
                await chai.request(server)
                    .post('/api/auth/guest')
                    .send()
                    .then(value => {
                        assert.propertyVal(value.body, "status", "success");
                        assert.propertyVal(value.body, "code", 200);
                        assert.propertyVal(value.body, "message", 'OK');
                        assert.propertyVal(value.body.data, "message", 'login as guest successfully!');
                        assert.property(value.body.data, "token");
                    })
            });
        });
    });
}


