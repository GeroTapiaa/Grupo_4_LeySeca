const { loadUsers, storeUsers, eliminarAvatarToUser } = require("../data/db-module");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const localStorage = require('localStorage')



module.exports = {
  login: (req, res) => {
    res.render("user/login");
  },

  loginRegister: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          user: req.body.user
        }

      })
        .then((user) => {


      req.session.userLogin = {
        id: +user.id,
        name: user.name,
        avatar: user.avatar ? user.avatar.filename : "default-ley-seca.jpg",
        rol: user.rolId,
    };
        if (req.body.remember) {
          
          res.cookie("userLeySeca", req.session.userLogin, {
                    maxAge: 1000 * 60,
          });
        }

        /* carrito*/


        db.Order.findOne({
          where : {
            userId :  req.session.userLogin.id,
            stateId : 1

          },
          include : [
            { 
              association : 'carts',
              attributes : ['id', 'quantity'],
              include : [
                {
                  association: 'product',
                  attributes : ['id', 'name', 'price', 'discount'],
                  
                }
              ]
            }
          ]
        }).then(order =>{
          if(order){
            req.session.orderCart = {
              id : order.id,
              total : order.total,
              items : order.cart
            }
          }else{
            db.Order.create({
              stateId : 1,
              total : 0,
              userId : req.session.userLogin.id,
              //paymentId : 1
            }).then(order => {
              req.session.orderCart = {
                id : order.id,
                total : order.total,
                items : []
              }
            })
          }
          res.redirect("/");
        })




        
      })
      .catch((err) => console.log(err));
  } else {
     res.render("user/login", {
      errors: errors.mapped(),
    });
    
  }
 


  },

  // REGISTRO

  register: (req, res) => {
    res.render("user/register");
  },

  userRegister: (req, res) => {
    const errors = validationResult(req);



    const { name, surname, user, date, address, email, password } = req.body;

    if (errors.isEmpty()) {
      db.User.create({
        name: name.trim(),
        surname: surname,
        user: user.trim(),
        date: date,
        address: address.trim(),
        email: email.trim(),
        password: bcrypt.hashSync(password.trim(), 10),
        avatar: req.file ? req.file.filename : "default-ley-seca.jpg",
        rolId: 2,
      })
        .then(() => {
          res.redirect("/users/login");
        })
        .catch((err) => console.log(err));
    } else {
      res.render("user/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  // PERFIL

  profile: (req, res) => {
    db.User.findByPk(req.session.userLogin.id)
      .then((user) => {
        res.render("user/profile", {

          user,

        })
      })

  },

  // EDITAR PERFIL

  profileEdit: async (req, res) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        res.render("user/profileEdit", {

          user,
          session: req.session,

        })
      })



  },

  // EDICION

  update: (req, res) => {

    db.User.update(
      {
        name: req.body.name?.trim(),
        user: req.body.user?.trim(),
        address: req.body.address?.trim(),
        avatar: req.file ? req.file.filename : req.session.userLogin.avatar
      },
      {
        where:
        {
          id: +req.params.id
        }
      })
      .then((user) => {
        req.session.userLogin = {

          ...req.session.userLogin,
          name: user.name,
          user: user.user,
          address: user.address,
          rol: req.session.userLogin.rol,
          avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
        };

      })

    res.redirect("/users/profile");




  },

  logout: (req, res) => {
    req.session.destroy();
    res.cookie("userLeySeca", null, { maxAge: -1 });
    res.redirect("/");

  },
  remove: async (req, res) => {
    try {
      if (req.session.userLogin.avatar) {
        eliminarAvatarToUser(req.session.userLogin.avatar)
      }
      await db.User.destroy({
        where: { id: req.session.userLogin.id }
      })

      res.clearCookie("userLeySeca")
      req.session.destroy();
      res.redirect('/');
    } catch (error) {
      return console.log(error)
    }
  },

};
