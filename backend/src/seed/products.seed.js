const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

mongoose
    .connect(process.env.DB_URI)
    .then(async () => {
    console.log("Mongo conectado");

    await Product.deleteMany(); // opcional, limpia la colección

    const products = await Product.insertMany([
        {
        name: "Pintura Naranja Premium",
        description: "Pintura para citricos",
        price: 450,
        stock: 20
        },
    {
        name: "Gas etileno",
        description: "Gas de maduración para frutas",
        price: 320,
        stock: 35
    }
    ]);

    console.log("Productos creados:", products);
    process.exit();
    })
    .catch((error) => {
    console.error(error);
    process.exit(1);
    });
