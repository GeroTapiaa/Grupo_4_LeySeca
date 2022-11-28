const router = require('express').Router();
const { getAllUsers, getUser, getAvatar} = require('../../controllers/API/apiUserController');

/* /api/users */

router
    .get('/',getAllUsers)
    .get('/:id',getUser)
    .get('/avatar/:avatar',getAvatar)
module.exports = router