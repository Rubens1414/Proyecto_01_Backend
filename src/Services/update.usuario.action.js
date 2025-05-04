import { UsuarioModel } from "../Models/usuario.model.js";
import bcrypt from 'bcryptjs';


async function updateUsuario (id_usuario, name, email, password) {

    const usuario = await UsuarioModel.findOne({ id_usuario });
    const usuarioexiste = await UsuarioModel.findOne({ email });
    if (usuarioexiste) {
        
        return 'Email Existente o es el mismo';
    }
    if (usuario.isActive == false) {
        console.log("El usuario está inactivo.");
     
        return 'Inactivo';
    }
    if (!usuario) {
        console.log("Usuario no encontrado.");
        return null;
    }

    password = await bcrypt.hash(password, 10);
  
    const usuarioact = await UsuarioModel.updateOne({ id_usuario }, { name, email, password }, { new: true });
    console.log("Usuario actualizado correctamente.");
    return usuarioact;

}

export default updateUsuario;