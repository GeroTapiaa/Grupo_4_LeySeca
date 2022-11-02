const { loadUsers, storeUsers } = require("../data/db-module");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");


module.exports = {
  login: (req, res) => {
    res.render("user/login");
  },
 
  loginRegister: (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty()){
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
         res.redirect("/");
      })
      .catch((err) => console.log(err));
  } else {
     res.render("user/login", {
      errors: errors.mapped(),
    });
    
  }
 

  //   if (errors.isEmpty()) {
  //     let { name, rol, avatar, id } = loadUsers().find(
  //       (user) => user.user === req.body.user
  //     );

  //     req.session.userLogin = {
  //       name,
  //       rol,
  //       avatar,
  //       id,
  //     };
  //     if (req.body.remenber) {
  //       res.cookie("userLeySeca", req.session.userLogin, {
  //         maxAge: 1000 * 60,
  //       });
  //     }
  //     res.redirect("/");
  //   } else {
  //     res.render("user/login", {
  //       errors: errors.mapped(),
  //     });
  //   }
  // },
  // 



  },

  // REGISTRO

  register: (req, res) => {
    res.render("user/register");
  },

  userRegister: (req, res) => {
    // const errors = validationResult(req);

    // if (errors.isEmpty()) {
    //   const { name, lastName, user, date, address, email, password } = req.body;
    //   const users = loadUsers();

    //   newUser = {
    //     id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
    //     name: name.trim(),
    //     lastName: lastName.trim(),
    //     user: user.trim(),
    //     date: date,
    //     address: address.trim(),
    //     email: email.trim(),
    //     password: bcrypt.hashSync(password.trim(), 10),
    //     avatar: req.file ? req.file.filename : "default-ley-seca.jpg",
    //     rol: "user",
    //   };
    //   const userModify = [...users, newUser];
    //   storeUsers(userModify);

    //   res.redirect("/users/login");
    // }
    // res.render("user/register", {
    //   errors: errors.mapped(),
    //   old: req.body,
    // });
    const errors = validationResult(req);
    const { name, surname, user, date, address, email, password} = req.body;

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
    .then((user)=>{
        res.render("user/profile",{
            
            user,
            
        })
    })
    // let user = loadUsers().find((user) => user.id === req.session.userLogin.id);
    // res.render("user/profile", {
    //   user,
    // });
  },

  // EDITAR PERFIL

  profileEdit: async(req, res) => {
    db.User.findByPk(req.params.id)
    .then((user)=>{
        res.render("user/profileEdit",{
           
            user,
            session:req.session,
          
        })
    })
  
    // let user = loadUsers().find((user) => user.id === req.session.userLogin.id);
    // res.render("user/profileEdit", {
    //   user,
    // });
    
  },

  // EDICION

  update:(req, res) => {
   
    db.User.update(
      {
          name: req.body.name?.trim(),
          user: req.body.user?.trim(),
         address:req.body.user?.trim(),
          avatar: req.file ? req.file.filename : req.session.userLogin.avatar
      },
      {
          where:
          {
              id: +req.params.id
          }
      })
      .then((user) =>
      {
        req.session.userLogin = {
        
          ...req.session.userLogin,
          name : user.name,
          user: user.user,
          address: user.address,
          avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
        };

      })
      res.redirect("/users/profile");


    // const { user, address, name } = req.body;

    // let usersModify = loadUsers().map((user) => {
    //   if (user.id === +req.params.id) {
    //     return {
    //       ...user,
    //       ...req.body,

    //       avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
    //     };
    //   }
    //   return user;
    // });

    // // MODIFICA LAS IMAGENES SUBIDAS POR EL USUSARIO
    // if (req.file) {
    //   if (
    //     fs.existsSync(
    //       path.resolve(
    //         __dirname,
    //         "..",
    //         "..",
    //         "public",
    //         "images",
    //         "users",
    //         req.session.userLogin.avatar
    //       )
    //     )
    //   ) {
    //     fs.unlinkSync(
    //       path.resolve(
    //         __dirname,
    //         "..",
    //         "..",
    //         "public",
    //         "images",
    //         "users",
    //         req.session.userLogin.avatar
    //       )
    //     );
    //   }
    // }

    // req.session.userLogin = {
    //   ...req.session.userLogin,
    //   name,
    //   avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
    // };

    // storeUsers(usersModify);
    // return res.redirect("/users/profile");
    
  },

  logout: (req, res) => {
    req.session.destroy();
    res.cookie("userLeySeca", null, { maxAge: -1 });
    return res.redirect("/");
  
  },
};
