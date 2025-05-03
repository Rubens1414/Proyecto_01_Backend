import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function BloquearSiLogin(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return next(); 
    }
    try {
        return res.status(400).json({
            message: "Ya has iniciado sesión.",
        });
    } catch (err) {
      
        return next();
    }
}

function EstaLogin(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Inicio de sesión requerido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
      
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
}


export  {BloquearSiLogin, EstaLogin};
