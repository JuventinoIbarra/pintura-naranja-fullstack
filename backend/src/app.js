const express = require("express");
const mongoose = require('mongoose');

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes")

const app = express();

app.use((req, res, next) => {
    const allowedOrigins = [
        "https://juventinoibarra.github.io",
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

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