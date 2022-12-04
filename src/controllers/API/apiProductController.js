const db=require('../../database/models')
const fs = require ('fs');
const path = require ('path');
const { literal} = require('sequelize');
const  sendSequelizeError = require('../../helpers/SendSequelizeError');
const  createError = require('../../helpers/createError');
const { count } = require('console');



module.exports = {
    getAllProduct : async (req, res) =>{
        const {limit} = req.query


        try {
            let total = await db.Product.count();
            let products = await db.Product.findAll({
                attributes : {
                    exclude : ['createdAt', 'updatedAt'],
                    
                },
                include : [
                    {
                        association : 'category',
                        attributes : {
                            exclude : ['createdAt', 'updatedAt']
                        }
                    }
                ],
                limit : limit ? +limit : 5,
                offset : limit ? +limit : 5


            });
            
            products.forEach(product => {
                product.setDataValue('link',`${req.protocol}://${req.get('host')}${req.originalUrl}/${product.id}`)
            });
            return res.status(200).json({
                ok :true,
                status : 200,
                meta : { 
                    total 
                },
                data : {
                    products
                }
            })



        } catch (error) {
            let errors = sendSequelizeError(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : errors
            })
        }




    },
    getById : async (req, res) => {

        const {id} = req.params
        try {
            
            if(isNaN(id)){                                                    
                throw createError(400,'El ID debe ser un numero');
            }
            
            const product = await db.Product.findByPk(req.params.id,{
                include : [
                    {
                        association : 'category',
                        attributes : {
                            exclude : ['createdAt', 'updatedAt']
                        }
                    }
                ]
            })

            if(!product){
                throw createError(404,'No se encontró un Producto con ese ID');
            }

            return res.status(200).json({                                  
                meta : {
                    ok:true,
                    status:200,
                    
                },
                data : product
            })
        } catch (error) {
            let errors = sendSequelizeError(error)
            return res.status(error.status || 500).json({
                ok: false,
                errors,
            });
        }




    }



















}