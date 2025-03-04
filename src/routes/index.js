var express = require('express');
var router = express.Router();

var products = require('./products')
var cart = require('./cart')
var api = require('./api')

// Routes
// Thể hiện các trang "Danh sách sản phẩm", "Chi tiết sản phẩm"
router.use('/products', products);
// Thể hiện trang "Giỏ hàng" và thực hiện các thao tác thêm và xóa sản phẩm trong giỏ hàng
router.use('/cart', cart);
// Thể hiện các API trả về dữ liệu JSON và Sử dụngPostman để tương tác vớiAPI (tạo, sửa, xóa, lấy danh sách sản phẩm).
router.use('/api', api);

router.get("/", (req, res) => {
    res.redirect("/products");
});

module.exports = router;