var express = require('express');
var router = express.Router();
const { home, terms } = require('../controllers/indexController');

/* GET home page. */

router
    .get('/', home)
    .get('terminos', terms)


module.exports = router;