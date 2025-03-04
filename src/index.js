const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const uri = "mongodb+srv://pikachu123450vn:phuc1234567890@cluster0.4lvmo.mongodb.net/shoppingonline";

var db = mongoose.connect(uri).then(() => console.log("Kết nối thành công với MongoDB Atlas!"))

var router = require('./routes')

var view_dir = __dirname + "/views";
app.set('views', view_dir);
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});

app.use('/',router);