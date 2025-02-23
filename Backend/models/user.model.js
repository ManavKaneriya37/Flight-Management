const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}, {
    timestamps: true
});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    }, process.env.JWT_PRIVATE_KEY);
    return token;
}

userSchema.method.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
