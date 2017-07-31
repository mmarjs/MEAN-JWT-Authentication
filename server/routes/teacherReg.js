const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tutordb');
// const db = mongoose.connection;

RegisterModel = require('../models/teacherReg');
const teacherRegController = require('../controllers/teacherReg');

router.get('/', (rep, res) => {
  res.send('api works!');
})

// router.get('*', function(req, res) {
//     res.sendfile('./public/views/index.html');
// })

router.get('/teacherReg', teacherRegController.getRegisters);

router.get('/teacherReg/:_id', teacherRegController.getRegisterById);

router.post('/teacherReg', teacherRegController.addRegister);

router.put('/teacherReg/:_id', teacherRegController.updateRegister);

router.delete('/teacherReg/:_id', teacherRegController.removeRegister);

// router.get('/search', function(req, res) {
//     const query = req.query.key;
//     // console.log(query);
//     RegisterModel.search(query, function(err, model) {
//         if(err) {
//             throw err;
//         }
//         res.json(model);
//     })
// });

module.exports = router;