import { model,Schema } from "mongoose";
import bcrypt from "bcryptjs";

export const UsuarioSchema = new Schema({
    id_usuario: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    libros_reservados: { type: Object, default: [{
        id_libro: { type: Number, required: true },
        titulo: { type: String, required: true },
        fecha_reserva: { type: Date, required: true },
        fecha_entrega: { type: Date, required: true },
    }] },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
   
 
});
UsuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
export const UsuarioModel = model("Usuarios", UsuarioSchema); 