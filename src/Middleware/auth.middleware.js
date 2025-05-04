import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Verifica si el usuario ya ha iniciado sesión y bloquea el acceso a la ruta de inicio de sesión si es así
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

//verfica si el token es válido y si el usuario tiene permisos para acceder a la ruta
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

//funcion principal para verificar permisos de los usuarios
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

//verifica si el usuario tiene permisos para crear, actualizar o eliminar libros
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

//verifica si el usuario tiene permisos para actualizar o eliminar usuarios
function permisoActualizarUsuario(req, res, next) {
    const mensaje='No tiene permiso para actualizar usuarios'
    permisosControl("ACTUALIZAR-USUARIOS",req,res,next,mensaje)
}
function permisoEliminarUsuario(req,res,next) {
    const mensaje='No tiene permiso para eliminar usuarios'
    permisosControl("ELIMINAR-USUARIOS",req,res,next, mensaje)
}



export  {BloquearSiLogin, EstaLogin, permisoCrearLibro, permisoActualizarLibro, permisoEliminarLibro, permisoActualizarUsuario, permisoEliminarUsuario};
