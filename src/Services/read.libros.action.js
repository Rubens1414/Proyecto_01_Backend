import { LibroModel } from "../Models/libro.model.js";


// Obtener todos los libros activos
async function allLibros() {
    const libros = await LibroModel.find({ isActive: true}, { _id: 0, __v: 0,isActive: 0 });
    if (libros.length === 0) {
        return null;
    }
    return libros;
    
}

export default allLibros;