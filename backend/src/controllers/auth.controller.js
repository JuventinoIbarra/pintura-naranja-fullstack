const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// REGISTRO

exports.register = async (req,res) => {
    try{
        const {nombre, email, password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "El usuario ya existe"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            nombre,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Usuario registrado correctamente",
        });
    }catch(error){
        console.error("ERROR REGISTER:", error);
        res.status(500).json({
            message: "Error en el registro",
            error: error.message
        });
    }
};

exports.login = async (req,res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Credenciales invalidas"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Credenciales invalidas"});
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.json({
            token,
            user: {
            id:user._id,
            nombre: user.nombre,
            email: user.email,
            role: user.role,
        },
    });
    }catch(error){
        console.error("ERROR REGISTER:", error);
        res.status(500).json({
            message: "Error en el registro",
            error: error.message
        });
    }
}