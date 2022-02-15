import express from "express";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const permissionSchema = Schema({
    name: {type: String, required: true},
    group: {type: String, required: true},
    label: {type: String, required: true},
}, {timestamps: true, toJSON: {virtuals: true, versionKey: false}});

permissionSchema.plugin(mongoosePaginate);

export default  mongoose.model('Permission', permissionSchema);
