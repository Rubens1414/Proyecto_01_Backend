import { UsuarioModel } from "../Models/usuario.model.js";


//soft delete usuario
async function deleteUsuarioAction (id_usuario) {
    
    const usuario = await UsuarioModel.findOne({ id_usuario });
    // Validar que el usuario ya esté inactivo
    if (usuario.isActive == false) {
        console.log("El usuario ya está inactivo.");
        return 'Inactivo';
    }
    // Validar que el usuario exista
    if (!usuario) {
        console.log("Usuario no encontrado.");
        return null;
    }
    
    const usuarioel = await UsuarioModel.findOneAndUpdate({ id_usuario }, { isActive: false }, { new: true });
    console.log("Usuario eliminado correctamente.");
    return usuarioel;

   
 
}

export default deleteUsuarioAction;