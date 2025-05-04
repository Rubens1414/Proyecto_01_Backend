import { LibroModel } from "../Models/libro.model.js";

async function updateLibroAction(id_libro, titulo, autor, editorial, fecha_publicacion, descripcion, genero, cantidad,disponibilidad) {
    const libro = await LibroModel.findOne({ id_libro });
    if (!libro) {
        console.log("No se encontró el libro.");
        return null;
    }
    if (libro.isActive == false) {
        console.log("El libro está inactivo.");
        return 'Inactivo';
    }
   const libroact = await LibroModel.findOneAndUpdate({ id_libro },  { titulo, autor, editorial, fecha_publicacion, descripcion, genero, cantidad, disponibilidad }, { new: true });
   console.log("Libro actualizado correctamente.");

    return libroact;


}

export default updateLibroAction;