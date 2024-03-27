const sequelize = require('sequelize');
const db = require("../database.js");

var user = db.define(
    "user",
    {
        id:{
            type: sequelize.INTEGER, 
            primaryKey: true
        },
        username:{
            type: sequelize.STRING
        },
        password:{
            type: sequelize.STRING
        }
    },
    {
        //menghilangkan akhiran s pada table
        freezeTableName : true,
        //tidak menggunakan createdAt dan UpdatedAt
        timestamps : false,
    }
);

module.exports = user;