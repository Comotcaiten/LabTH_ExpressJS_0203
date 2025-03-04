var Products = require('../models/ProductsModel');
var Categories = require('../models/CategoriesModel');
var mongoose = require('mongoose');

class ProductsController {
    async GetProducts(req, res) {
        try {
            var products = await Products.find({});
            return res.json({ data: products });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async AddProducts(req, res) {
        try {
            const { name, price, categories_id, images, description } = req.body;
            console.log(name, price, categories_id, images);

            if (!name || !price || !categories_id || !images || !description) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            if (typeof name !== 'string'|| typeof description !== 'string' || typeof price !== 'number' || !Array.isArray(categories_id) || !Array.isArray(images)) {
                return res.status(400).json({ message: "Invalid field type" });
            }

            // var productExist = await Products.find({name: name}) 
            // if (productExist.length > 0) {
            //     console.log("Product already exists: ", productExist);
            //     return res.status(400).json({ message: "Product already exists" });
            // }

            var id = await (new mongoose.Types.ObjectId()).toString()

            var product = new Products({_id: id, name, description, price, categories_id, images, show: true});
            await product.save();

            return res.json({ message: "Add product successfully"});
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async UpdateProducts(req, res) {
        try {
            var product = await Products.findById(req.params.id);
            if (!product) return res.status(404).json({ message: "Product not found" });
            product.name = req.body.name;
            product.description = req.body.description;
            product.price = req.body.price;
            product.categories_id = req.body.categories_id;
            product.images = req.body.images;
            await product.save();
            return res.json({ message: "Update product successfully" });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async DeleteProducts(req, res) {
        try {
            var product = await Products.findById(req.params.id);
            if (!product) return res.status(404).json({ message: "Product not found" });
            await Products.deleteOne({ _id: req.params.id });
            return res.json({ message: "Delete product successfully" });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error"});
        }
    }

    async ViewListOfProduct(req, res) {
        var products
        var data = { products: {}, message: ""};
        try {
            products = await Products.find({});
            data.products = products;
            data.message = "Get products successfully";
            
        } catch (error) {
            data.message =  "Internal Server Error";
            products = [];
        }
        return res.render('products_list', data);
    }

    async ViewDetailOfProduct(req, res) {
        var data = { product: {}, message: "", get: false};
        console.log("req.params.id: ", req.params.id);
        try {
            var product = await Products.findOne({_id: req.params.id}).populate('categories_id');
            if (!product) {
                data.message = "Product not found";
                data.product = {};
                data.get = false;
            }
            else {
                data.product = product;
                data.message = "Get product successfully";
                data.get = true;
            }
        } catch (error) {
            data.message = "Internal Server Error";
            data.product = {};
            data.get = false;
        }
        console.log("data: ", data);
        return res.render('product_detail', data);
    }
}

module.exports = new ProductsController;