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
      .then(user => {
          
          req.session.user = {
              id: user.id,
              name: user.name,
              
              
              avatar: user.avatar,
              rol: user.rol
          }
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
    const { name, lastName, user, date, address, email, password} = req.body;

    if (errors.isEmpty()) {
      db.User.create({
        name: name.trim(),
        lastName: lastName.trim(),
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
      res.render("users/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  // PERFIL

  profile: (req, res) => {
    let user = loadUsers().find((user) => user.id === req.session.userLogin.id);
    res.render("user/profile", {
      user,
    });
  },

  // EDITAR PERFIL

  profileEdit: (req, res) => {
    let user = loadUsers().find((user) => user.id === req.session.userLogin.id);
    res.render("user/profileEdit", {
      user,
    });
  },

  // EDICION

  update: (req, res) => {
    const { user, address, name } = req.body;

    let usersModify = loadUsers().map((user) => {
      if (user.id === +req.params.id) {
        return {
          ...user,
          ...req.body,

          avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
        };
      }
      return user;
    });

    // MODIFICA LAS IMAGENES SUBIDAS POR EL USUSARIO
    if (req.file) {
      if (
        fs.existsSync(
          path.resolve(
            __dirname,
            "..",
            "..",
            "public",
            "images",
            "users",
            req.session.userLogin.avatar
          )
        )
      ) {
        fs.unlinkSync(
          path.resolve(
            __dirname,
            "..",
            "..",
            "public",
            "images",
            "users",
            req.session.userLogin.avatar
          )
        );
      }
    }

    req.session.userLogin = {
      ...req.session.userLogin,
      name,
      avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
    };

    storeUsers(usersModify);
    return res.redirect("/users/profile");
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
};
