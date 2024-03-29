const db = require('../../database/models')
module.exports = {
    list : async (req, res) => {
        try {
            return res.status(200).json({
                ok :true,
                data : req.session.orderCart || null
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'no anda esto'
            })
        }
    },
    addItem : async (req,res) => {
        try {

            const {id} = req.body;

            let item = req.session.orderCart.items.find(item => item.product.id === +id);

            if(item) {

                await db.Cart.update(
                    {
                        quantity : item.quantity + 1
                    },
                    {
                      where : {
                        id : item.id
                      }  
                    }
                )

                const itemsModify = req.session.orderCart.items.map(element => {
                    if(element.id === item.id){
                        element.quantity = element.quantity + 1;
                        return element
                    }

                    return element
                })

                req.session.orderCart = {
                    ...req.session.orderCart,
                    items : itemsModify
                   }

            }else {

               const newCart = await db.Cart.create({
                    quantity : 1,
                    productId : id,
                    orderId : req.session.orderCart.id
               });

               const cartItem = await db.Cart.findByPk(newCart.id, {
                attributes : ['id','quantity'],
                include : [
                  {
                    association : 'product',
                    attributes : ['id','nameProduct','price','discount','image'],
                    
                  }
                ]
               });

               req.session.orderCart = {
                ...req.session.orderCart,
                items : [
                    ...req.session.orderCart.items,
                    cartItem
                ]
               }

            }

            return res.status(201).json({
                ok : true,
                data : req.session.orderCart || null
            })

            
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'apa'
            })
        }
    },
    removeQuantity  : async (req, res) => {
        try {
            const {id} = req.params;

            
            let item = req.session.orderCart.items.find(item => item.product && item.product.id === +id);

            if(item.quantity > 1){
                await db.Cart.update(
                    {
                        quantity : item.quantity -1 
                    },
                    {
                        where :{
                            id
                        }
                    }
                )

                const itemsModify = req.session.orderCart.items.map(element => {
                    if(element.id == item.id){
                        element.quantity = element.quantity - 1;
                        return element
                    }

                    return element
                })

                req.session.orderCart = {
                    ...req.session.orderCart,
                    items : itemsModify
                   }

            }else{
              
                   await db.Cart.destroy({
                    where : {
                        id : item.id
                  }
                });
                const itemsModify = req.session.orderCart.items.filter(element => element.id != item.id)
                console.log(itemsModify);


                req.session.orderCart = {
                    ...req.session.orderCart,
                    items : itemsModify
                   }
            }
            return res.status(201).json({
                ok : true,
                data : req.session.orderCart || null
            })

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'apa'
            })
        }
    },
    removeAllItems : async (req, res) => {

    }
}