const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const roleSchema = Schema({
    name: {type: String, required: true},
    label: {type: String, required: true},
    lang: {type: String, required: true},
    permissions: [{type: Schema.Types.ObjectId, ref: 'Permission'}]
}, {timestamps: true, toJSON: {virtuals: true, versionKey: false}});

roleSchema.plugin(mongoosePaginate);


export default  mongoose.model('Role', roleSchema);
