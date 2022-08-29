var express = require('express');
var router = express.Router();
const { home, terms, search } = require('../controllers/indexController');

/* GET home page. */

router
    .get('/', home)
    .get('/terminos', terms)
    .get('/results', search)


module.exports = router;