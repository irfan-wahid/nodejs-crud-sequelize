const model = require('../models/index');

const {Op} = require('sequelize');

const controller = {};

//function get all data
controller.getAll = async (req,res) => {
    try{
        const userData = await model.user.findAll();
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
                password : req.body.password,
                token : req.body.username + req.body.password,
            })
            .then((result) => {
                res.status(201).json({
                    message: "user successful created",
                    data: {
                        username: req.body.username,
                        password: req.body.password,
                        token: req.body.username + req.body.password,
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
                        password : req.body.password,
                        token : req.body.username + req.body.password,
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
                        password: req.body.password,
                        token: req.body.username + req.body.password,
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

module.exports = controller;