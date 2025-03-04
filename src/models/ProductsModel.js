const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Thiết lập Collection "Products"
var ProductsSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    price: Number,
    categories_id: [{
        type: String,
        ref: 'Categories'
    }],
    images: [String],
    show: Boolean
});

var ProductModel = mongoose.model('Products', ProductsSchema);

module.exports = ProductModel;