import { Router } from "express";
import {createUsuario, readUsuario,updateUsuario,deleteUsuario,getAllUsuarios} from "../Controller/usuario.controller.js";
import {BloquearSiLogin,EstaLogin,permisoActualizarUsuario, permisoEliminarUsuario} from "../Middleware/auth.middleware.js";


const UsuarioRouter = Router();
UsuarioRouter.get("/todos", getAllUsuarios);
UsuarioRouter.post("/crear", createUsuario);
UsuarioRouter.post("/login", BloquearSiLogin, readUsuario);
UsuarioRouter.put("/actualizar/:id_user_update", EstaLogin,permisoActualizarUsuario, updateUsuario);
UsuarioRouter.delete("/eliminar/:id_user_delete", EstaLogin,permisoEliminarUsuario, deleteUsuario);





export default UsuarioRouter;