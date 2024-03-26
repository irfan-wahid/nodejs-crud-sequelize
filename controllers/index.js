const userController = require ('./userController');
const transactionController = require ('./transactionController');

var controllers = {
    transaction : transactionController,
    user : userController,
};

module.exports = controllers;