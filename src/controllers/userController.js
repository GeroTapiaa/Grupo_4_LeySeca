const { loadUsers, storeUsers } = require('../data/db-module');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

module.exports = {
  login: (req, res) => {
    res.render("user/login");
  },

  loginRegister: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { name, rol, avatar, id } = loadUsers().find(
        (user) => user.user === req.body.user
      );

      req.session.userLogin = {
        name,
        rol,
        avatar,
        id,
      };
      res.redirect("/");
    } else {
      res.render("user/login", {
        errors: errors.mapped(),
      });
    }
  },

  register: (req, res) => {
    let image = loadUsers().find((user) => user.avatar === req.body.avatar);
    res.render("user/register", {
      image,
    });
  },

  // REGISTRO

  userRegister: (req, res) => {
    const errors = validationResult(req);


    if (errors.isEmpty()) {
      const { name, lastName, user, date, address, email, password } =
        req.body;
      const users = loadUsers();

      newUser = {
        id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
        name: name.trim(),
        lastName: lastName.trim(),
        user: user.trim(),
        date: date,
        address: address.trim(),
        email: email.trim(),
        password: bcrypt.hashSync(password.trim(), 10),
        avatar: req.file ? req.file.filename : 'default-ley-seca.jpg',
        rol: "user",
      };
      const userModify = [...users, newUser];
      storeUsers(userModify);

      res.redirect("/users/login");
    }
    res.render("user/register", {
      errors: errors.mapped(),
      old: req.body,
    });
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
    const { user, address, name, } = req.body;

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



    if (req.file) {


      if (fs.existsSync(path.resolve(__dirname, "..", "..", "public", "images", "users", req.session.userLogin.avatar))) {



        fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", "users", req.session.userLogin.avatar));

      }
    };

    req.session.userLogin = {
      ...req.session.userLogin,
      name,
      avatar: req.file ? req.file.filename : req.session.userLogin.avatar
    }

    storeUsers(usersModify);
    return res.redirect("/users/profile");
  },

  // DESLOGUEARSE

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
