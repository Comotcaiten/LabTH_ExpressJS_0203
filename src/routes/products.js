var express = require('express');
var router = express.Router();
var productssController = require('../controllers/ProductsController')

router.get("/detail/:id", productssController.ViewDetailOfProduct);
router.get("", productssController.ViewListOfProduct);

module.exports = router;