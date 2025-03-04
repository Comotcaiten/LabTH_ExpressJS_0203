var express = require('express');
var router = express.Router();
const Carts = require('../controllers/CartsController');

// POST /cart/add/:id
router.post('/add/:id', Carts.AddProducts);

// POST /cart/delete/:id
router.post('/remove/:id', Carts.Delete);

// GET /cart
router.get('/', Carts.GetCarts);

module.exports = router;