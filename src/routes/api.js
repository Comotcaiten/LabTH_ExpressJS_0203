var express = require('express');
var router = express.Router();
var productssController = require('../controllers/ProductsController')
var categoriesController = require('../controllers/CategoriesController')

// Products
// Add - Create
router.post("/products/add", productssController.AddProducts);
// Update
router.put("/products/update/:id", productssController.UpdateProducts);
// Delete
router.delete("/products/delete/:id", productssController.DeleteProducts);
// Get - Read
router.get("/products", productssController.GetProducts);

// Categories
// Add - Create
router.post("/categories/add", categoriesController.AddCatagory);
// Update
router.put("/categories/update/:id", categoriesController.UpdateCategory);
// Delete
router.delete("/categories/delete/:id", categoriesController.DeleteCategory);
// Get - Read
router.get("/categories", categoriesController.GetCategories);

module.exports = router;