import { LibroModel } from "../Models/libro.model.js";



async function allLibros() {
    const libros = await LibroModel.find({ isActive: true });
    if (libros.length === 0) {
        return null;
    }
    return libros;
    
}

export default allLibros;