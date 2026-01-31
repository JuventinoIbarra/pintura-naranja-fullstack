const express = require("express");
const mongoose = require('mongoose');

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes")

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes)


app.get("/", (req, res) =>{
    res.send("API Pintura Naranja funcionando");
});

app.use(require("./middlewares/error.middleware"));
module.exports = app;