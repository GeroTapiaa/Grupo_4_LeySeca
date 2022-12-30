const router = require('express').Router();
const { getAllProduct, getById, image } = require('../../controllers/API/apiProductController');

router
    .get('/', getAllProduct)
    .get('/:id', getById)
    .get('/image/:image', image);

module.exports = router