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

function permisosControl(parametro_permiso,req,res,next, mensaje) {

    const {permisos} = req.user;
    
    if (permisos[parametro_permiso] == true) {
        next()
    } else {
        return res.status(403).json({
            message: mensaje,
        });
    }

}

function permisoCrearLibro(req, res, next) {
    const mensaje='No tiene permiso para crear libros'
    permisosControl("CREAR-LIBROS",req,res,next,mensaje)
}
function permisoActualizarLibro(req, res, next) {
    const mensaje='No tiene permiso para actualizar libros'
    permisosControl("ACTUALIZAR-LIBROS",req,res,next,mensaje )
}
function permisoEliminarLibro(req, res, next) {
    const mensaje='No tiene permiso para eliminar libros'
    permisosControl("ELIMINAR-LIBROS",req,res,next,mensaje)
}
function permisoActualizarUsuario(req, res, next) {
    const mensaje='No tiene permiso para actualizar usuarios'
    permisosControl("ACTUALIZAR-USUARIOS",req,res,next,mensaje)
}
function permisoEliminarUsuario(req,res,next) {
    const mensaje='No tiene permiso para eliminar usuarios'
    permisosControl("ELIMINAR-USUARIOS",req,res,next, mensaje)
}



export  {BloquearSiLogin, EstaLogin, permisoCrearLibro, permisoActualizarLibro, permisoEliminarLibro, permisoActualizarUsuario, permisoEliminarUsuario};
