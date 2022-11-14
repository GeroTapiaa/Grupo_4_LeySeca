const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const{eliminarImg} = require('../data/db-module')



const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = {
  products: (req, res) => {
   
    let productsBeer = db.Product.findAll({
      where: {
        categoryId: 1,
      },
    });
    Promise.all([productsBeer]).then(([productsBeer]) => {
      res.render("products/products", {
        productsBeer,
        toThousand,
      });
    });
  },
  shop: (req, res) => {
 
    let productsClothing = db.Product.findAll({
      where: {
        categoryId: 2,
      },
    });
    Promise.all([productsClothing]).then(([productsClothing]) => {
       res.render("products/shop", {
        productsClothing,
        toThousand,
      });
    });
  },

  experience: (req, res) => {
    res.render("products/experienceDoms");
  },
  experienceTour: (req, res) => {
    res.render("products/experienceTour");
  },
  experiencePatagonia: (req, res) => {
    res.render("products/experiencePatagonia");
  },
  details: (req, res) => {
   
    let product = db.Product.findByPk(req.params.id)
    let productsStatus = db.Product.findAll({
        
        
            limit:4
        
      });
      Promise.all([product,productsStatus]).then(([product,productsStatus]) => {
        
        res.render("products/productDetail", {
            product,
          productsStatus,
          toThousand,
        });
      });
    
    
  },

  
  carrito: (req, res) => {
   
    let productCart = db.Product.findByPk(req.params.id)
    
      Promise.all([productCart]).then(([productCart]) => {
        
        res.render("products/shopping-cart", {
          productCart,
        
          toThousand,
        });
      });
  },

  edit: (req, res) => {
  
    let productEdit = db.Product.findByPk(req.params.id);
    let category = db.Category.findAll({ attributes: ['id', 'name'] });
    

    Promise.all([productEdit, category])
        .then(([productEdit, category]) => {
           
             res.render("products/form-edit", { productEdit, category})
        })
        .catch(error => res.send(error))
    
  },
  update: (req, res) => {
  
  let errors = validationResult(req)
  errors = errors.mapped()
  if (req.fileValidationError) {
      errors = { ...errors, img: { msg: req.fileValidationError } }
  }
  
        
  if (Object.entries(errors).length === 0) {
      const { name, discount, price, description,categoryId } = req.body;
     
      if (req.file) {
          let product = db.Product.findByPk(req.params.id);
          Promise.all([product])
          .then(([product]) => 
              eliminarImg(product.image)
          )
          .catch(error => console.log(error))
      }
      const products = {
              id : req.params.id,
              name : name.trim(),
              discount: discount,
              price : price,
            description,
        category: categoryId,
        
          }
          db.Product.update(products, {
              where:
              {
                  id: req.params.id
              }
          })
    
        
          
          .then(product => {
             
              if(req.file){
                  db.Product.update({
                    image: req.file ? req.file.filename : "default-ley-seca.jpg",},
                      {where:{id:req.params.id}})
                  .then(product => {});
              }
             
              return res.redirect('/products/productDetail/'+ req.params.id)
          })
          .catch(error => console.log(error))
  }
  
  else {
      let product = db.Product.findByPk(req.params.id,{
          include : ['category']
      });
      let Category;
      Promise.all([product])
      .then(([productEdit]) => {
          Category = db.Category.findAll();
          Promise.all([Category])
          .then(([category]) => res.render('products/form-edit', {
              productEdit,category,errors
              }))
          .catch(error => console.log(error))
          }
      )
  }
 
  },
 

  create: (req, res) => {
   
      let Category = db.Category.findAll();
      Promise.all([Category])
          .then(([categories]) => res.render('products/form-create', {
              categories
          }))
          .catch(error => console.log(error))
     
  },

  // CREAR PRODUCTO
  store: (req, res) => {
    

    let errors = validationResult(req)
    

    if (errors.isEmpty()) {
        const {name, price,discount, description, category } = req.body;


        db.Product.create({
          name : name.trim(),
            price: +price,
            discount,
            description,
            categoryId : category,
            image: req.file ? req.file.filename : "default-ley-seca.jpg",
            
        })
        
            .then(product => {
              res.redirect('/products/productDetail/' + product.id);
            })
            .catch(error => console.log(error))
    } else {
      res.render("products/form-create", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },


  destroy: (req, res) => {
    
    db.Product.destroy(
      {
          where: { id: req.params.id }
      })
      .then(() => {
           res.redirect('/')
      })
      .catch(error => res.send(error))
  },


 
};
