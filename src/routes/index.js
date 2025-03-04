var express = require('express');
var router = express.Router();

var products = require('./products')
var cart = require('./cart')
var api = require('./api')

router.use('/products', products);
router.use('/cart', cart);
router.use('/api', api);

router.get("/", (req, res) => {
    res.redirect("/products");
});

module.exports = router;