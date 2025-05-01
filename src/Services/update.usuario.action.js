import { UsuarioModel } from "../Models/usuario.model.js";


async function updateUsuario (id_usuario, name, email, password) {
    if (!id_usuario) {
        console.log("No se ha proporcionado un id_usuario.");
        return null;
    }
    const usuario = await UsuarioModel.findOne({ id_usuario });
    if (usuario.isActive == false) {
        console.log("El usuario está inactivo.");
     
        return 'Inactivo';
    }
    console.log(usuario);
    if (!usuario) {
        console.log("Usuario no encontrado.");
        return null;
    }
    if(usuario.isActive == false){
        return null;
    }
    if (name) {
        usuario.name = name;
    }
    if (email) {
        usuario.email = email;
    }
    if (password) {
        usuario.password = password;
    }

    await usuario.save();
    console.log("Usuario actualizado correctamente.");
    return usuario;

}

export default updateUsuario;