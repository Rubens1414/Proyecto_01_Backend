import { model,Schema } from "mongoose";
import bcrypt from "bcryptjs";

const reservaSchema = new Schema({
    id_libro: { type: Number, required: true },
    ticket: { type: Number, required: true },
    titulo: { type: String, required: true },
    fecha_reserva: { type: Date, required: true },
    fecha_entrega: { type: Date, required: false }, 
}, { _id: false })

export const UsuarioSchema = new Schema({
    id_usuario: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    libros_reservados: { type: [reservaSchema], default: [] },
    permisos: {
        type: Object,
        default: {
            "ACTUALIZAR-USUARIOS": false,
            "ELIMINAR-USUARIOS": false,
            "CREAR-LIBROS": false,
            "ACTUALIZAR-LIBROS": false,
            "ELIMINAR-LIBROS": false
        }
    },
    isActive: { type: Boolean, default: true },
   
 
});
UsuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
export const UsuarioModel = model("Usuarios", UsuarioSchema); 