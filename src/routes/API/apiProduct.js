const router = require('express').Router();
const { getAllProduct, getById} = require('../../controllers/API/apiProductController');

router
    .get('/', getAllProduct)
    .get('/:id', getById)
    
module.exports = router