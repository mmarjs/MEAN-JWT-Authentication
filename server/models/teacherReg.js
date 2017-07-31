const mongoose = require('mongoose');

const RegisterSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    certification: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

const RegisterModel = module.exports = mongoose.model('Register', RegisterSchema);

module.exports.getRegisters = function(callback, limit) {
    RegisterModel.find(callback).limit(limit);
}

module.exports.getRegisterById = function(id, callback) {
    RegisterModel.findById(id, callback);
}

module.exports.addRegister = function(register, callback) {
    RegisterModel.create(register, callback);
}

module.exports.updateRegister = function(id, register, options, callback) {
    const query = { _id: id };
    const update = {
        username: register.username,
        overview: register.overview,
        education: register.education,
        language: register.language,
        certification: register.certification
    };
    RegisterModel.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeRegister = function(id, callback) {
    const query = { _id: id };
    RegisterModel.remove(query, callback);
}


