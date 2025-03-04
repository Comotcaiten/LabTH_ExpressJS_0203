var Categories = require('../models/CategoriesModel');
var mongoose = require('mongoose');

class CategoriesController {

    // Get
    async GetCategories(req, res) {
        try {
            var categoties = await Categories.find({});
            return res.json({ data: categoties });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Post
    async AddCatagory(req, res) {
        try {
            var { name, parent_category_id } = req.body;
            
            if (!name) return res.status(400).json({ message: "Name is required" });
            if (Array.isArray(parent_category_id) || !typeof parent_category_id == 'string') {
                return res.status(400).json({ message: "Parent category id must be not an array" })
            };
            
            var id = await (new mongoose.Types.ObjectId()).toString();
            console.log(id);
            var category = new Categories({
                _id: id,
                name: name,
                parent_category_id: parent_category_id
            });
            console.log(category);
            await category.save();
            return res.json({ message: "Add category successfully" });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Put
    async UpdateCategory(req, res) {
        try {
            var { name, parent_category_id } = req.body;
            var category = await Categories.findById(req.params.id);
            if (!category) return res.status(404).json({ message: "Category not found" });

            if (!name) return res.status(400).json({ message: "Name is required" });

            if (Array.isArray(parent_category_id) || !typeof parent_category_id == 'string') {
                return res.status(400).json({ message: "Parent category id must be not an array" })
            };
            
            var parent_category = await Categories.find({ _id: parent_category_id });
            if (parent_category.length <= 0) {
                return res.status(400).json({ message: "Parent category id not found" });
            }

            category.name = name;
            category.parent_category_id = parent_category_id;

            await category.save();
            return res.json({ message: "Update category successfully" });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Delete
    async DeleteCategory(req, res) {
        try {
            var category = await Categories.findById(req.params.id);
            if (!category) return res.status(404).json({ message: "Category not found" });
            await Categories.deleteOne({ _id: req.params.id });
            return res.json({ message: "Delete category successfully" });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

module.exports = new CategoriesController();