const Product = require("../models/Product")
const Order = require("../models/Order");
const mongoose = require('mongoose');

const allowedTransitions ={
    pendiente: ["pagado", "cancelado"],
    pagado: ["enviado", "cancelado"],
    enviado: ["entregado"],
    entregado: [],
    cancelado: []
};

// Crear pedido (cliente)
exports.createOrder = async (req, res) => {
    try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
        message: "Products debe ser un arreglo con al menos un producto",
        });
    }

    let total = 0;
    for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
        }
        total += product.price * item.quantity;
    }

    const order = new Order({
        user: req.user._id,
        products,
        total,
    });

    await order.save();



    res.status(201).json(order);
    } catch (error) {
    res.status(500).json({ message: "Error al crear el pedido" });
    }
};

// Ver MIS pedidos (cliente)
exports.getMyOrders = async (req, res) => {
    try {
    const orders = await Order.find({ user: req.user._id })
        .populate("products.product", "name price");


    res.json(orders);
    } catch (error) {
    res.status(500).json({ message: "Error al obtener mis pedidos" });
    }
};

// Ver TODOS los pedidos (admin)
exports.getAllOrders = async (req, res) => {
    try {
    const orders = await Order.find()
        .populate("user", "email role")
        .populate("products.product", "name price");

    res.json(orders);
    } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try{
    const { status}= req.body;
    const order = await Order.findById(req.params.id);
    
    if(!order){
        return res.status(400).json({message: "Pedido no encontrado"});
    }

    
    const validStatus = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];
    if(!validStatus.includes(status)){
        return res.status(400).json({message: "Estado invalido"});
    }
    
    if(!allowedTransitions[order.status].includes(status)){
        return res.status(400).json({
            message: `No se puede cambiar de ${order.status} a ${status}`
        });
    }

    order.status = status;
    await order.save();
    
    res.json(order);
}catch(error){
    res.status(500).json({message: error.message});
}
}