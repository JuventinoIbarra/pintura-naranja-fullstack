const express = require("express");
const mongoose = require('mongoose');

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes")

const app = express();

app.use((req, res, next) => {
    const origin = req.headers.origin;

    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});



app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes)

app.use(require("./middlewares/error.middleware"));

app.get("/", (req, res) =>{
    res.send("API Pintura Naranja funcionando");
});

module.exports = app;