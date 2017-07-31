'use strict';

const teacherReg = require('../models/teacherReg');

module.exports.addRegister = function(req, res) {
    teacherReg.addRegister(req.body, function(err, teacher) {
        if(err) {
            throw err;
        }
        res.status(201).send(teacher);
    });
}

module.exports.getRegisters = function(req, res) {
    teacherReg.getRegisters((err, teachers) => {
        if(err) {
            throw err;
        }
        res.status(201).send(teachers);
    })
}

module.exports.getRegisterById = function(req,res) {
    teacherReg.getRegisterById(req.params._id, function(err, teacher) {
        if (err) {
            throw err;
        }
        res.status(201).send(teacher);
    });
}

module.exports.updateRegister = function(req,res) {
    const id = req.params._id;
    const teacher = req.body;
    teacherReg.updateRegister(id, teacher, {}, function(err, teacher) {
        if (err) {
            throw err;
        }
         res.status(201).send(teacher);
    });
}
module.exports.removeRegister = function(req,res) {
    const id = req.params._id;
    teacherReg.removeRegister(id, function(err, teacher) {
        if (err) {
            throw err;
        }
        res.status(201).send(teacher);
    });
}

