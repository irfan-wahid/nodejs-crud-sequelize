const model = require('../models/index');

const {Op} = require('sequelize');

const pagination = require('../pagination/index')

const controller = {};

controller.getUserTransaction = async (req, res) => {

    try{
        const transactionData = await model.transaction.findAll({
            where:{
                user_id: {
                    [Op.eq] : req.params.user_id
                },

                //untuk melakukan pencarian secara dinamis (opsional)
                ...req.body.amount && {amount: {[Op.eq] : req.body.amount}}
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

controller.listTransaction = async (req, res) => {

    const page = req.query.page ? req.query.page : 0
    const size = req.query.size ? req.query.size : 10
    const { limit, offset } = pagination.parse(page, size)  

    const whereClause = (query) => ({
        ...query.user_id && {user_id: {[Op.eq]: query.user_id}},
        ...query.amount && {amout: {[Op.eq]: query.amount}},
        ...req.query.pagination == 'true' && { offset: offset, limit: limit }
    })

    try{
        const result = await model.transaction.findAndCountAll({
            order: [["id", 'asc']],
            where: whereClause(req.query),
        })

        if (result){
            res
                .status(200)
                .json({
                    message: "Connection Successfull",
                    data: pagination.data(result, page, size),
                });
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