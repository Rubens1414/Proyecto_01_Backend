import { model,Schema } from "mongoose";

export const libroSchema = new Schema({
    id_libro: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    editorial: { type: String, required: true },
    fecha_publicacion: { type: Date, required: true },
    descripcion: { type: String, required: true },
    genero: { type: String, required: true },
    cantidad: { type: Number, required: true },
    disponibilidad: { type: Boolean, default: true },
    historial_reservas: { type: Object, default: [{
        id_usuario: { type: Number, required: true },
        nombre_usuario: { type: String, required: true },
        fecha_reserva: { type: Date, required: true },
        fecha_entrega: { type: Date, required: true },
    }] },
    isActive: { type: Boolean, default: true },
})

export const LibroModel = model("Libros", libroSchema);  