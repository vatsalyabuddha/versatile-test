const express = require("express");
const router = express.Router();
const apiController = require('../controllers/apiController');
// const statusM = require('../models/statusModel');
const vahanController = require('../controllers/vahanController');


router.get('/',(req,res) => {
    res.send('API!!');
})

router.post('/init-process',(req,res) => {
    //const data =  vahanController.processRegistrationNumber();
    //res.send(data);
})

router.post('/process-reg',(req,res) => {


})

router.get('/total-reg-checked',(req,res) => {

})

router.get('/total-uninssured-reg',(req,res) => {

})

router.get('/total-inssured-reg',(req,res) => {

})

router.get('/total-sms-triggered',(req,res) => {

})

module.exports = router 