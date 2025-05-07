import { UsuarioModel } from "../Models/usuario.model.js";

async function createUsuarioAction (name, email, password) {

    // Validar que el usuario no exista
    const usarioExiste = await UsuarioModel.findOne({ email });
    if (usarioExiste) {
        return 'Existe';
    }
     // Obtener el último id_usuario y sumarle 1 para el nuevo usuario
    const ultimoUsuario = await UsuarioModel.findOne().sort({ id_usuario: -1 });
    const nuevoId = ultimoUsuario ? ultimoUsuario.id_usuario + 1 : 1;
    const usuario = new UsuarioModel({
        id_usuario : nuevoId,
        name,
        email,
        password,
    });
    await usuario.save();
    return usuario;
    

}

export default createUsuarioAction;