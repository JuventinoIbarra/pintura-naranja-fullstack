const express = require('express');
const router = express.Router();
const {verifyToken} = require("../middlewares/auth.middleware");

router.get("/protected", verifyToken, (req,res) =>{
    res.json({
        message: "Acceso permitido",
        user: req.user
    });
});

module.exports = router;