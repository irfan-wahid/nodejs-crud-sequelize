const userModel = require('./userModel');
const transactionModel = require('./transactionModel');

const model = {
    user : userModel,
    transaction : transactionModel
};

module.exports = model;