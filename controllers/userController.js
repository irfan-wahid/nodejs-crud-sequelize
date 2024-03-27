const model = require('../models/index');

const {Op} = require('sequelize');

const pagination = require('../pagination')

const controller = {};

//function get all data
controller.getAll = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const size = req.query.size ? parseInt(req.query.size) : 10;
    const { limit, offset } = pagination.parse(page, size);

    try {
        const userData = await model.user.findAndCountAll({
            raw: false,
            order: [["id", 'desc']],
            ...req.query.pagination == 'true' && { offset, limit }
        });

        if (userData.count > 0) {
            res.status(200).json({
                message: "Connection Successful",
                data: pagination.data(userData, page, size),
            });
        } else {
            res.status(500).json({
                message: "Connection Failed",   
                data: [],
            });
        }
    } catch (error) {
        res.status(404).json({ message: "Error" });
    }
};

// get by username
controller.getUsername = async (req, res) => {
    try{
        var userData = await model.user.findAll({
            where: {
                username : {
                    [Op.like] : `%${req.params.username}`
                },
            }
        });
        if (userData.length > 0){
            res
                .status(200)
                .json({
                    message: "Connection Successfull",
                    data: userData,
                })
        }else{
            res.status(500).json({
                message:"Connection Failed", 
                data : [],
            });
        };
    }catch (error){
        res.status(404).json({message: "error"});
    }
}

//create new data
controller.createNew = async (req, res) =>{
    try{
        var checkData = await model.user.findAll({
            where: {
                username : {
                    [Op.like] : `%${req.body.username}`
                },
            }
        });

        if (checkData.length > 0){
            res.status(500).json({
                message: "username already in use"
            });
        }else{
            await model.user.create({
                username : req.body.username,
                password : req.body.password
            })
            .then((result) => {
                res.status(201).json({
                    message: "user successful created",
                    data: {
                        username: req.body.username,
                        password: req.body.password
                    },
                });
            });
        }
    }catch (error){
        res.status(404).json({message: "error"});
    }
}

//update existing data
controller.updateData = async (req, res) => {
    try{
        await model.user.findAll({
            where: {
                id : {
                    [Op.like] : `%${req.params.id}`
                }
            }
        })
        .then(async (result) =>{
            if (result.length > 0 ){
                await model.user.update(
                    {
                        username : req.body.username,
                        password : req.body.password
                    },
                    {
                        where : {
                            id : req.params.id
                        }
                    }
                );
                res.status(200).json({
                    message: "update successful",
                    data: {
                        id: req.body.id,
                        username: req.body.username,
                        password: req.body.password
                    },
                });
            }else{
                res.status(500).json({ message: "update failed"});
            }
        })
    }catch (error){
        res.status(404).json({message: "error"});
    }
}

//delete data
controller.deleteData = async (req, res) => {
    try{
        const result = await model.user.findAll({
            where: {
                id: {
                    [Op.eq]: req.params.id
                }
            }
        });
    
        if (result.length > 0) {
    await model.user.destroy({
                where: {
                    id: {
                        [Op.eq]: req.params.id
                    }
                }
            });
    
            res.status(200).json({
                message: "delete data successful",
            });
        } else {
            res.status(404).json({
                message: "Data not found",
            });
        }
    }catch (error){
        res.status(404).json({message: "error"});
    }
}

controller.login = async (req, res) =>{
    try{
        const result = await model.user.findOne({
            where:{
                username: req.body.username,
                password: req.body.password
            }
        });

        if (result){
            res.status(200).json({
                message: "login berhasil",
            });
        }else{
            res.status(500).json({message: "username atau password salah"});
        }
    }catch (error){
        res.status(404).json({message: "error"});
    }
}

module.exports = controller;