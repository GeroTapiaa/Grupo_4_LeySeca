const { loadUsers, storeUsers } = require('../data/db-module');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const fs = require('fs');
const path = require('path');

module.exports = {
  login: (req, res) => {
    res.render('user/login')
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
      if(req.body.remenber){
        res.cookie('userLeySeca', req.session.userLogin, {
          maxAge : 1000 * 60 
        })
      }
      res.redirect("/");
    } else {
      res.render("user/login", {
        errors: errors.mapped(),
      });
    }
  },
  register: (req, res) => {
    res.render('user/register')
  },

  userRegister: (req, res) => {

    const errors = validationResult(req);


    if (errors.isEmpty()) {
      const { name, lastName, user, date, address, email, password, avatar } = req.body;
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
        avatar,
        rol: "user"

      }
      const userModify = [...users, newUser]
      storeUsers(userModify);

      res.redirect('/users/login');
    }
    res.render('user/register', {
      errors: errors.mapped(),
      old: req.body
    })



    },
    profile: (req, res) => {
      let user  = loadUsers().find(user => user.id === req.session.userLogin.id);
        res.render('user/profile' , {
          user
        })
    },
    update: (req, res) => {

      const {firstName, lastName, birthday, address} = req.body;
      const usersModify = loadUsers().map(user => {
        if(user.id === +req.params.id){
          return {
            ...user,
            ...req.body
          }
        }
        return user
      })

      req.session.userLogin = {
        ...req.session.userLogin, 
        firstName
      }

      storeUsers(usersModify);
      res.redirect('/users/profile');

    },
    edit: (req, res) => {
        res.render('user/profileEdit')
    },
    logout : (req,res) => {
      req.session.destroy()
      return res.redirect('/')
    }

}