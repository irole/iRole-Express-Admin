import express from "express";
// Packages
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
// Controller
//const testController = require('../../TestController');
// Services
const userService = require('@services/userService');

module.exports = function (server, data) {

    describe('/Login', () => {

        describe('Get', () => {
            it('Success', async () => {
                await chai.request(server)
                    .get('/auth/login')
                    .then(value => {
                        assert.propertyVal(value, "statusCode", 200);
                    })
            });
        });

        describe('Post', () => {
            it('Success', async () => {
                const user = await userService.findOne({email: data.email});
                assert.isObject(user);
                assert.propertyVal(user, "email", 'test@irole.group');
                assert.propertyVal(user, "isGuest", false);
                assert.propertyVal(user, "rememberToken", null);
                assert.propertyVal(user, "admin", false);
            });
        });
    });
}


