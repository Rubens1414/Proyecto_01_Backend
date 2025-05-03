import { LibroModel } from "../Models/libro.model.js";


async function deleteLibroAction(id_libro) {

 
    const libro = await LibroModel.findOne({ id_libro });
    if (!libro) {
      
        return null;
    }
    if (libro.isActive == false) {
        console.log("El libro ya esta inactivo.");
        return 'Inactivo';
    }
    const libroel = await LibroModel.findOneAndUpdate({ id_libro }, { isActive: false }, { new: true });
    console.log("Libro eliminado correctamente.");
    return libroel;

}

export default deleteLibroAction;