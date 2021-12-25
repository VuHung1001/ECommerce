const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // handles .env file
const cors = require("cors");// require for stripe
dotenv.config();// dotenv must run before stripeRoute were defined

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");// login ,register route
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");// payment route


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json()); // enable receive json in request
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});
