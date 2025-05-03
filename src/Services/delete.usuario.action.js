import { UsuarioModel } from "../Models/usuario.model.js";



async function deleteUsuarioAction (id_usuario) {
  
    const usuario = await UsuarioModel.findOne({ id_usuario });
    if (usuario.isActive == false) {
        console.log("El usuario ya está inactivo.");
        return 'Inactivo';
    }
  
    if (!usuario) {
        console.log("Usuario no encontrado.");
        return null;
    }
    
    const usuarioel = await usuario.findOneAndUpdate({ id_usuario }, { isActive: false }, { new: true });
    console.log("Usuario eliminado correctamente.");
    return usuarioel;

   
 
}

export default deleteUsuarioAction;