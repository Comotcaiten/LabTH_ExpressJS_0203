var express = require('express');
const Carts = require('../controllers/CartsController');
var router = express.Router();

router.post('/add/:id', Carts.AddProducts);

router.post('/remove/:id', Carts.Delete);

router.get('/', Carts.GetCarts);


module.exports = router;