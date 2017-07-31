const mongoose = require('mongoose');
const passwordHash = require('password-hash');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        token: {
            type: String,
        },
        create_at: {
            type: Date,
            default: Date.now
        }
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

const UserModel = module.exports = mongoose.model('User', UserSchema);

module.exports.getUsers = function(callback, limit) {
    UserModel.find(callback).limit(limit);
}

module.exports.addUser = function(user, callback) {
    user.password = passwordHash.generate(user.password);
    UserModel.create(user, callback);
}

module.exports.findByUsername = function(username, callback) {
    const query = {username: username};
    UserModel.findOne(query, callback);
}

module.exports.findByUserId = function(id, callback) {
    UserModel.findById(id, callback);
}

module.exports.addToken = function(id, authToken, callback) {
    const query = { _id: id };
    const update = {
        token: {
            token: authToken
        }
    }
    UserModel.findByIdAndUpdate(query, update, callback);
}

module.exports.clearUserSession = function(id, callback) {
    const query = { _id: id };
    const update = {
        token: {
            token: ''
        }
    };
    UserModel.findByIdAndUpdate(query, update, callback);
}