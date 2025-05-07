
import { UsuarioModel } from "../Models/usuario.model.js";
import bcrypt from "bcryptjs";


async function readUsuarioAction (email, password) {
    const usuario = await UsuarioModel.findOne({ email });
    //verifica si el usuario existe
    if(usuario.isActive == false){
        return 'Inactivo';
    }
 
   
    if (!usuario) {
        return null;
    }
    //verifica si la contraseña coincide 
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
        return 'No coincide';
    }
 
    return usuario;
}
export default readUsuarioAction;
