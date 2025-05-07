import createUsuarioAction from "../Actions/create.usuario.action.js";
import readUsuarioAction from "../Actions/read.login.usuario.action.js";
import updateUsuarioAction from "../Actions/update.usuario.action.js";
import deleteUsuarioAction from "../Actions/delete.usuario.action.js";
import allUsuarios from "../Actions/read.usuarios.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 
//Obtiene todos los usuarios
async function getAllUsuarios(req, res) {
   
   
    const usuarios = await allUsuarios();
    res.status(200).json(usuarios);

}

//Crea un nuevo usuario
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
    if (usuario === 'Existe') {
        res.status(400).json({
            message: "El usuario ya existe.",
        });
        return;
    }
    if (!usuario) {
        res.status(500).json({
            message: "Error al crear el usuario.",
        });
        return;
    }
    res.status(201).json(usuario);
}


// Inicia sesión con un usuario
async function readUsuario(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Faltan datos.",
        });
    }

    const usuario = await readUsuarioAction(email, password);
    if(usuario== 'Inactivo'){
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

    // Generar el token JWT
    const token = jwt.sign(
        { id_usuario: usuario.id_usuario, email: usuario.email, permisos: usuario.permisos}, 
        process.env.JWT_SECRET, 
        { expiresIn: "4h" } 
    );

    res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
    });
}
// Actualiza un usuario por su id
async function updateUsuario(req, res) {
    const {id_user_update} = req.params;
    const { name,email, password} = req.body;
    if (!id_user_update) {
        return res.status(400).json({
            message: "Debes proporcionar el id del usuario a actualizar.",
        });
    }
    if (!name && !email && !password) {
        return res.status(400).json({
            message: "Debes proporcionar al menos un campo para actualizar.",
        });
    }
   
    
        const usuario = await updateUsuarioAction(id_user_update, name, email, password);
        if(usuario == 'Inactivo'){
            return res.status(400).json({
                message: "El usuario está inactivo.",
            });
        }
        if(usuario == 'Email Existente o es el mismo'){
            return res.status(400).json({
                message: "El email ya existe en otro usuario.",
            });
        }
        if (usuario === null || usuario === undefined) {
            return res.status(404).json({
                message: "Usuario no encontrado. ",
            });
        }
        res.status(200).json({
            message: "Usuario actualizado correctamente.",
        });
 
}

// Elimina un usuario por su id
async function deleteUsuario(req, res) {
   
    const {id_user_delete} = req.params;
    if (!id_user_delete) {
        return res.status(400).json({
            message: "No se ha encontrado el id del usuario.",
        });
    }
    
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
export { createUsuario, readUsuario, updateUsuario,deleteUsuario,getAllUsuarios};
