import { model,Schema } from "mongoose";
const reservaSchema = new Schema({
    id_usuario: { type: Number, required: true },
    ticket: { type: Number, required: true },
    nombre_usuario: { type: String, required: true },
    fecha_reserva: { type: Date, required: true },
    fecha_entrega: { type: Date, required: false }, 
}, { _id: false })
export const libroSchema = new Schema({
    id_libro: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    editorial: { type: String, required: true },
    fecha_publicacion: { type: Date, required: true },
    descripcion: { type: String, required: true },
    genero: { type: String, required: true },
    cantidad: { type: Number, required: true },
    disponibilidad:{ type: String, required: true },
    historial_reservas: { type: [reservaSchema], default: [] },
    isActive: { type: Boolean, default: true },
})

export const LibroModel = model("Libros", libroSchema);  