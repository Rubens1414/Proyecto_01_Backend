import { Router } from "express";
import {createUsuario, readUsuario,updateUsuario,deleteUsuario,getAllUsuarios} from "../Controller/usuario.controller.js";
import {BloquearSiLogin,EstaLogin,permisoActualizarUsuario, permisoEliminarUsuario} from "../Middleware/auth.middleware.js";


const UsuarioRouter = Router();
//Muestra todos los usuarios
UsuarioRouter.get("/todos", getAllUsuarios);
//Crear un usuario 
UsuarioRouter.post("/crear", createUsuario);
//  login con  email y contraseña
UsuarioRouter.post("/login", BloquearSiLogin, readUsuario);
//Actualizar un usuario por  su id
UsuarioRouter.put("/actualizar/:id_user_update", EstaLogin,permisoActualizarUsuario, updateUsuario);
//Eliminar un usuario por su id
UsuarioRouter.delete("/eliminar/:id_user_delete", EstaLogin,permisoEliminarUsuario, deleteUsuario);





export default UsuarioRouter;