const model = require('../models/index');

const {Op} = require('sequelize');

const controller = {};

controller.getUserTransaction = async (req, res) => {
    try{
        const transactionData = await model.transaction.findAll({
            where:{
                user_id: {
                    [Op.eq] : req.params.user_id
                }
            }
        });

        let respData = [];

        for(const trx of transactionData){
            const userData = await model.user.findOne({
                where : {
                    id : {
                        [Op.eq] : trx.user_id
                    }
                }
            })

            trxResponse = {
                id : trx.id,
                userId : trx.user_id,
                username : userData.username,
                amount : trx.amount,
            }

            respData.push(trxResponse);
        };

        if (transactionData.length > 0){
            res
                .status(200)
                .json({
                    message: "Connection Successfull",
                    data: respData,
                })
        }else{
            res.status(500).json({
                message:"Connection Failed", 
                data : [],
            });
        };
    }catch(error){
        res.status(404).json({message: "error"});
    }
}

module.exports = controller;