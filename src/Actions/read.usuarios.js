import { UsuarioModel } from "../Models/usuario.model.js";

// Obtener todos los usuarios activos
async function allUsuarios() {
    const usuarios = await UsuarioModel.find({}, { password: 0, __v: 0 , isActive: 0, permisos: 0,_id: 0, "libros_reservados.ticket":0 });

    return usuarios;
    
}

export default allUsuarios;