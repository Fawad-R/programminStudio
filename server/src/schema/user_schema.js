const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
let key = 'aijfaojfspaosjfam02102!#@!@12';
let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    favoriteMovies: [Number],
    token: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
},
    { timestamps: true }
)
userSchema.methods.generateAuthToken = async function () {
    let e = await jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, key, { expiresIn: '3h' });
    this.token = e;
    console.log('e',e)
    return e;
};
module.exports = mongoose.model('User', userSchema);