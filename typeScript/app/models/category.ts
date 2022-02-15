import express from "express";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');


const CategorySchema = Schema({
    name: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, ref: 'ShopCategory', default: null},
    categories: [{type: Schema.Types.ObjectId, ref: 'ShopCategory', default: null}],
    image: {type: Schema.Types.ObjectId, ref: 'File'},
    description:{type: String, default: null},
    lang: {type: String, required: true},
}, {timestamps: true, toJSON: {virtuals: true, versionKey: false }});

CategorySchema.plugin(mongoosePaginate);

CategorySchema.virtual('parents', {
    ref: 'Category',
    localField: 'categories',
    foreignField: '_id'
});

CategorySchema.virtual('childs', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'categories'
});

export default  mongoose.model('Category', CategorySchema);
