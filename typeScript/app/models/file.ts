const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const FileSchema = Schema({
    originalName: {type: String, required: true},
    title: {type: String, required: true},
    slug: {type: String, required: true},
    alt: {type: String, default: null},
    type: {type: String, required: true},
    size: {type: Number, required: true},
    shortDescription: {type: String, default: null},
    description: {type: String, default: null},
    url: {type: String, required: true},
}, {timestamps: true, toJSON: {virtuals: true, versionKey: false}});

FileSchema.plugin(mongoosePaginate);

export default  mongoose.model('File', FileSchema);
