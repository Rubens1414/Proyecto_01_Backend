import { UsuarioModel } from "../Models/usuario.model.js";


async function allUsuarios() {
    const usuarios = await UsuarioModel.find({}, { password: 0, __v: 0 , isActive: 0, isAdmin: 0,_id: 0, "libros_reservados.ticket":0 });

    return usuarios;
    
}

export default allUsuarios;