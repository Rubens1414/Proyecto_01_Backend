import { UsuarioModel } from "../Models/usuario.model.js";

async function createUsuarioAction (name, email, password) {
    try {
        const usarioExiste = await UsuarioModel.findOne({ email });
        if (usarioExiste) {
            throw new Error("El usuario ya existe.");
        }
        const usuario = new UsuarioModel({
            id_usuario : 200000000 + Math.floor(Math.random() * 1000000),
            name,
            email,
            password,
        });
        await usuario.save();
        return usuario;
    } catch (error) {
        throw new Error(error.message);
    }

}

export default createUsuarioAction;