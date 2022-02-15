import express from "express";
// Packages
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
// Controller
//const testController = require('../../TestController');
// Services
const userService = require('@services/userService');
let agent;
let csrfToken

module.exports = function (server, data) {

    describe('/Register', () => {

        describe('Get', () => {
            it('Success', async () => {
                await chai.request(server)
                    .get('/auth/register')
                    .then(value => {
                        assert.propertyVal(value, "statusCode", 200);
                    })
            });
        });
        describe('Post', () => {
            it('Success', async () => {
                const user = await userService.insert({...data});
                assert.isObject(user);
                assert.propertyVal(user, "email", 'test@irole.group');
                assert.propertyVal(user, "isGuest", false);
                assert.propertyVal(user, "rememberToken", null);
                assert.propertyVal(user, "admin", false);
            });
        });
    });
}


