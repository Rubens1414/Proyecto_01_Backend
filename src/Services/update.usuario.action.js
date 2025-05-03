import { UsuarioModel } from "../Models/usuario.model.js";


async function updateUsuario (id_usuario, name, email, password) {

    const usuario = await UsuarioModel.findOne({ id_usuario });
    if (usuario.isActive == false) {
        console.log("El usuario está inactivo.");
     
        return 'Inactivo';
    }
    if (!usuario) {
        console.log("Usuario no encontrado.");
        return null;
    }
  
    const usuarioact = await UsuarioModel.updateOne({ id_usuario }, { name, email, password }, { new: true });
    console.log("Usuario actualizado correctamente.");
    return usuarioact;

}

export default updateUsuario;