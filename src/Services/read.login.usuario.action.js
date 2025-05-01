
import { UsuarioModel } from "../Models/usuario.model.js";
import bcrypt from "bcryptjs";


async function readUsuarioAction (email, password) {
    const usuario = await UsuarioModel.findOne({ email });
    if (usuario.isActive == false) {
       
        return null;
    }
    if (!usuario) {
        return null;
    }
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
        return null;
    }
 
    return usuario;
}
export default readUsuarioAction;
