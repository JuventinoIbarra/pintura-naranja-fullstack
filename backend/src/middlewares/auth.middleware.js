const jwt = require("jsonwebtoken");
const user = require("../models/User");

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foundUser = await user
            .findById(decoded.id)
            .select("-password");

        if (!foundUser) {
            return res.status(401).json({ message: "Usuario no existe" });
        }

        req.user = foundUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};


