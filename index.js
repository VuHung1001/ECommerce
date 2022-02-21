const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // handles .env file
dotenv.config();// dotenv must run before stripeRoute were defined

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");// login ,register route
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const checkoutRoute = require("./routes/checkout");// payment route
const mail = require("./routes/mail");// mail route
const cors = require("cors");
// const cookieSession = require('cookie-session');


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.dir(err);
    });

// app.use(cookieSession({
//     name: 'session',
//     keys: ['secret'],
    
//     // Cookie Options
//     sameSite: 'none'
// }))
app.use(cors());
app.use(express.json()); // enable receive json in request
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/mail", mail);

// process.env.NODE_ENV = 'production';// for developing stage

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname, "./Client-ECommerce/build")));
    app.use(express.static(path.resolve(__dirname, "./Admin-ECommerce/build")));
    
    app.get('/admin', (req, res) => {
        res.sendFile(path.resolve(__dirname, './Admin-ECommerce/build', 'index.html'));
    });
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './Client-ECommerce/build', 'index.html'));
    });
}

app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend server is running on port ${process.env.PORT || 5000}`);
});
