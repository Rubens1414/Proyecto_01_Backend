import { UsuarioModel } from "../Models/usuario.model.js";



async function deleteUsuarioAction (id_usuario) {
    if (!id_usuario) {
        console.log("No se ha proporcionado un id_usuario.");
        return null;
    }
    const usuario = await UsuarioModel.findOne({ id_usuario });
    if (usuario.isActive == false) {
        console.log("El usuario ya está inactivo.");
        return 'Inactivo';
    }
  
    if (!usuario) {
        console.log("Usuario no encontrado.");
        return null;
    }
    usuario.isActive = false;
    await usuario.save();
    console.log("Usuario eliminado correctamente.");
    return usuario;

   
 
}

export default deleteUsuarioAction;