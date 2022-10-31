const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

// const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));
// const saveProducts = (products) => {
//     fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(products, 'utf-8'));
// }

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = {
  products: (req, res) => {
    // let product = products.filter(product => product.category === 'Cerveza')

    // res.render('products/products', {
    //     product,
    //     toThousand

    // })
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
    // let clothing = products.filter(product => product.category === 'indumentaria')
    // res.render('products/shop', {
    //     clothing,
    //     toThousand

    // })
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
    // let { id } = req.params;
    // let productId = products.filter(product => product.id === +id);
    // let productsStatus = products.filter(product => product.status === "te puede interesar")

    // res.render('products/productDetail', {
    //     productId,
    //     productsStatus,
    //     toThousand

    // })
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
    // let productCart = products.filter(
    //   (product) => product.id === +req.params.id
    // );

    // res.render("products/shopping-cart", {
    //   productCart,
    // });
    let productCart = db.Product.findByPk(req.params.id)
    
      Promise.all([productCart]).then(([productCart]) => {
        
        res.render("products/shopping-cart", {
          productCart,
        
          toThousand,
        });
      });
  },

  edit: (req, res) => {
    // let { id } = req.params;
    // let productEdit = products.find((product) => product.id === +id);
    // res.render("products/form-edit", {
    //   productEdit,
    // });
    let productEdit = db.Product.findByPk(req.params.id);
    let category = db.Category.findAll({ attributes: ['id', 'name'] });
    

    Promise.all([productEdit, category])
        .then(([productEdit, category]) => {
           
             res.render("products/form-edit", { productEdit, category})
        })
        .catch(error => res.send(error))
    
  },
  update: (req, res) => {
    // let { id } = req.params;
    // let { name, discount, price, category, description } = req.body;
    // let productsModify = products.map((product) => {
    //   if (product.id === +id) {
    //     return {
    //       id: product.id,
    //       name: name.trim(),
    //       discount: +discount,
    //       price: +price,
    //       category,
    //       description: description.trim(),
    //       image: product.image,
    //     };
    //   }
    //   return product;
    // });
    // saveProducts(productsModify);
    // res.redirect("/products/productDetail/" + id);
    const{ name, discount, price, description } = req.body;
    
    const products = {
        id : req.params.id,
        name : name.trim(),
        discount: +discount,
        price : +price,
      description,
  category: +req.body.categoryId
    }
    db.Product.update(products, {
        where:
        {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('/products/productDetail/' + products.id);
    })
    .catch(error => console.log(error))

  },
 

  create: (req, res) => {
    // res.render("products/form-create");
    
      const categories = db.Category.findAll({ attributes: ['id', 'name'] });
    

      Promise.all([categories])
          .then(([categories]) => {
              res.render("products/form-create", { categories})
          })
          .catch(error => res.send(error))
  },

  // CREAR PRODUCTO
  store: (req, res) => {
    

    // const { name, price, discount, description, category } = req.body;
    // const newProduct = {
    //   id: products[products.length - 1].id + 1,
    //   name: name.trim(),
    //   description: description.trim(),
    //   price: +price,
    //   discount: +discount,
    //   category,
    // };
    // productsModify = [...products, newProduct];
    // saveProducts(productsModify);
    // if (newProduct.category === "indumentaria") {
    //  res.redirect("/products/products");
    // } else {
    //   res.redirect("/products/products");
    // }

    let errors = validationResult(req)
    errors = errors.mapped()

    if (req.fileValidationError) {
        errors = { ...errors, img: { msg: req.fileValidationError } }
    }

    if (Object.entries(errors).length === 0) {
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
    } 
  },


  destroy: (req, res) => {
    // let { id } = req.params;

    // let productsModify = products.filter((product) => product.id !== +id);
    // saveProducts(productsModify);
    // res.redirect("/");
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
