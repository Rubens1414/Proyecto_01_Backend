import { LibroModel } from "../Models/libro.model.js";

async function createLibroAction(titulo,autor,editorial,fecha_publicacion,descripcion,genero,cantidad) {
    const libroExistente = await LibroModel.findOne({ titulo: titulo });
    if (libroExistente) {
        throw new Error("El libro ya existe.");
    }
    const ultimoLibro = await LibroModel.findOne().sort({ id_libro: -1 });
    const nuevoId = ultimoLibro ? ultimoLibro.id_libro + 1 : 1;
    try {
        const libro = new LibroModel({
            id_libro:nuevoId  ,
            titulo: titulo,
            autor: autor,
            editorial: editorial,
            fecha_publicacion: fecha_publicacion,
            descripcion: descripcion,
            genero: genero,
            cantidad: cantidad,
            disponibilidad: 'disponible',
            historial_reservas: [],
        });
        await libro.save();
        return libro;
    } catch (error) {
        console.error("Error al crear el libro:", error);
        throw error;
    }
}

export default createLibroAction;