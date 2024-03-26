const sequelize = require ('sequelize');
const db = require('../database.js');

var transaction = db.define(
    "transaction",
    {
        id:{
            type: sequelize.INTEGER, 
            primaryKey: true
        },
        user_id:{
            type: sequelize.INTEGER,
        },
        amount:{
            type: sequelize.FLOAT,
        }
    },
    {
        //menghilangkan akhiran s pada table
        freezeTableName : true,
        //tidak menggunakan createdAt dan UpdatedAt
        timestamps : false,
    }
);

module.exports = transaction;