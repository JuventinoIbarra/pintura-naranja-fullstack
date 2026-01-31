const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const {verifyAdmin } = require("../middlewares/isAdmin.middleware")

// Cliente
router.post("/", verifyToken, orderController.createOrder);
router.get("/my", verifyToken, orderController.getMyOrders);

// Admin
router.get("/api/orders", verifyToken, verifyAdmin, orderController.getAllOrders);
router.patch("/:id/status", verifyToken, verifyAdmin, orderController.updateOrderStatus)

module.exports = router;
