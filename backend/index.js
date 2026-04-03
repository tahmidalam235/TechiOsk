const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (FINAL FIX)
mongoose.connect("mongodb+srv://tahmidalam235:tahmid123@cluster0.oot6to7.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("🔥 Database connected"))
.catch((err) => console.log(err));

// API Creation
app.get("/", (req,res) => {
    res.send("Express App is Running")
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});

// Static folder
app.use('/images',express.static('upload/images'));

// Upload API
app.post("/upload", upload.single('product'), (req,res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});

// Schemas 
const Product = mongoose.model("Product",{
    id:{type: Number, required: true},
    name:{type: String, required: true},
    image:{type: String, required: true},
    category:{type: String, required: true},
    new_price:{type: Number, required: true},
    old_price:{type: Number, required: true},
    date:{type: Date, default: Date.now},
    available:{type: Boolean, default: true},
});

const User = mongoose.model("User", {
    name:{type: String},
    email:{type: String, unique: true},
    password:{type: String},
    cartData:{type: Object},
    date:{type:Date, default: Date.now}
});

// Add Product
app.post('/add-product', async (req,res) => {
    let all_products = await Product.find({});
    let id = all_products.length > 0 ? all_products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
        id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });

    await product.save();
    res.json({ success: true });
});

// Get all products
app.get('/all-products', async (req,res) => {
    let all_products = await Product.find({});
    res.send(all_products);
});

// Signup
app.post('/signup', async (req,res) => {
    let check = await User.findOne({email:req.body.email});
    if (check){
        return res.status(400).json({success: false, error: "User exists"});
    }

    let cart = {};
    for(let i = 0; i < 300; i++){ cart[i] = 0; }

    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    });

    await user.save();

    const token = jwt.sign({user:{id:user.id}},'secret_ecom');
    res.json({success: true, token});
});

// Login
app.post('/login', async (req,res) => {
    let user = await User.findOne({email:req.body.email});
    if(user && req.body.password === user.password){
        const token = jwt.sign({user:{id:user.id}},'secret_ecom');
        res.json({success: true, token});
    } else {
        res.json({success: false});
    }
});

// Server start
app.listen(port, () => {
    console.log("🚀 Server running on port " + port);
});