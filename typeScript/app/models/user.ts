const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const mongoosePaginate = require('mongoose-paginate');

const userSchema = Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    rememberToken: {type: String, default: null},
    admin: {type: Boolean, default: false},
    role: {type: Schema.Types.ObjectId, ref: 'Role', default: null},
}, {
    timestamps: true,
    toJSON: {
        transform(doc: any, ret: any) {
            delete ret.password;
        }, virtuals: true, versionKey: false
    }
});

userSchema.plugin(mongoosePaginate);

userSchema.methods.comparePassword = function (password: any) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setRememberToken = function (res) {
    const token = uniqueString();
    res.cookie('remember_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 90,
        httpOnly: true,
        signed: true
    });
    this.update({rememberToken: token}, (err: any) => {
        if (err) console.log(err);
    });
};
userSchema.methods.isOwner = async function () {
    let user = await this.populate('role');
    return user.role.name === 'Owner';
};

export default mongoose.model('User', userSchema);
