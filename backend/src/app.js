const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes")

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes)

app.use(require("./middlewares/error.middleware"));

app.get("/", (req, res) =>{
    res.send("API Pintura Naranja funcionando");
});

module.exports = app;