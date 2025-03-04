var Products = require('../models/ProductsModel');

//  Giỏ hàng được quản lý bằng cookie
class CartsController {
    // POST /cart/add/:id
    async AddProducts(req, res) {
        try {
            const product = await Products.findById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
    
            let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    
            let existingProduct = cart.find(item => item._id === product._id.toString());
    
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    _id: product._id.toString(),
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    categories_id: product.categories_id,
                    images: product.images,
                    quantity: 1
                });
            }
    
            res.cookie('cart', JSON.stringify(cart), { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    
            res.json({ message: 'Added to cart successfully', cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // POST /cart/delete/:id
    async Delete (req, res) {
        const cartItems = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
        for(let product of cartItems) {
            if (product._id === req.params.id) {
                console.log("Remove Item")
                cartItems.splice(cartItems.indexOf(product), 1)
                req.cookies.cart
            }
        }
        res.cookie('cart', JSON.stringify(cartItems), { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.redirect('/cart')
    }

    // GET /cart
    async GetCarts(req, res) {
        const cartItems = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
        let total_price = 0;
        for (let product of cartItems) {
            total_price += product.quantity * product.price;
        }
        res.render('cart', { cartItems: cartItems, total_price: total_price });
    }
}

module.exports = new CartsController;