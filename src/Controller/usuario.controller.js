import createUsuarioAction from "../Services/create.usuario.action.js";
import readUsuarioAction from "../Services/read.login.usuario.action.js";
import updateUsuarioAction from "../Services/update.usuario.action.js";
import deleteUsuarioAction from "../Services/delete.usuario.action.js";
import allUsuarios from "../Services/read.usuarios.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

async function getAllUsuarios(req, res) {
   
   
    const usuarios = await allUsuarios();
    res.status(200).json(usuarios);

}
async function createUsuario(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({
            message: "Faltan datos.",
        });
        return;
    }
    if (password.length < 6) {
        res.status(400).json({
            message: "La contraseña debe tener al menos 6 caracteres.",
        });
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({
            message: "El email no es valido.",
        });
        return;
    }
    const usuario = await createUsuarioAction(name, email, password);
    res.status(201).json(usuario);
}



async function readUsuario(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Faltan datos.",
        });
    }

    const usuario = await readUsuarioAction(email, password);
    if(usuario.isActive == false){
        return res.status(400).json({
            message: "El usuario esta inactivo.",
        });
    }
    if (usuario === 'No coincide') {
        return res.status(400).json({
            message: "La contraseña no coincide.",
        });
    }

    if (!usuario) {
        return res.status(404).json({
            message: "Usuario no encontrado.",
        });
    }

    const token = jwt.sign(
        { id_usuario: usuario.id_usuario, email: usuario.email, isAdmin: usuario.isAdmin }, 
        process.env.JWT_SECRET, 
        { expiresIn: "2h" } 
    );
    res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
    });
}
   
async function updateUsuario(req, res) {
    const { id_usuario, isAdmin} = req.user;
    const {id_user_update} = req.params;
    const { name,email, password} = req.body;
    if (!id_user_update) {
        return res.status(400).json({
            message: "Debes proporcionar el id del usuario a actualizar.",
        });
    }
   
    if(isAdmin == false && id_usuario != id_user_update ){
        
        return res.status(403).json({
            message: "No tienes permisos para actualizar otros usuarios.",
        });
    }else if (isAdmin == true && id_usuario != id_user_update) {
        const usuario = await updateUsuarioAction(id_user_update, name, email, password);
        if(usuario == 'Inactivo'){
            return res.status(400).json({
                message: "El usuario está inactivo.",
            });
        }
        if (usuario === null) {
            return res.status(404).json({
                message: "Usuario no encontrado. ",
            });
        }
        res.status(200).json({
            message: "Usuario actualizado correctamente.",
        });
    }
    else{
        const usuario = await updateUsuarioAction(id_user_update, name, email, password);
        if(usuario == 'Inactivo'){
            return res.status(400).json({
                message: "El usuario está inactivo.",
            });
        }
        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado.",
            });
        }
        res.status(200).json({
            message: "Usuario actualizado correctamente.",
        });
    }
    

}

async function deleteUsuario(req, res) {
    const { id_usuario, isAdmin} = req.user;
    const {id_user_delete} = req.params;
    if (!id_user_delete) {
        return res.status(400).json({
            message: "No se ha encontrado el id del usuario.",
        });
    }
   
    if(isAdmin == false && id_usuario != id_user_update ){
        
        return res.status(403).json({
            message: "No tienes permisos para eliminar a otros usuarios.",
        });
    }else if (isAdmin == true && id_usuario != id_user_delete) {
        const usuario = await deleteUsuarioAction(id_user_delete);

        if(usuario === 'Inactivo'){
            return res.status(400).json({
                message: "El usuario ya está inactivo.",
            });
        }
        
        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado. ",
            });
        }
        res.status(200).json({
            message: "Usuario eliminado correctamente.",
        });
    }
    else{
        const usuario = await deleteUsuarioAction(id_user_delete);
     
        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado.",
            });
        }
        res.status(200).json({
            message: "Usuario eliminado correctamente.",
        });
    }
    

}
export { createUsuario, readUsuario, updateUsuario,deleteUsuario,getAllUsuarios};
