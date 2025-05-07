import { LibroModel } from "../Models/libro.model.js";

async function createLibroAction(titulo,autor,editorial,fecha_publicacion,descripcion,genero,cantidad) {
    // Validar que el libro no exista
    const libroExistente = await LibroModel.findOne({ titulo: titulo });
    if (libroExistente) {
        return 'Existe';
    }
    
    const ultimoLibro = await LibroModel.findOne().sort({ id_libro: -1 });
    // Obtener el último id_libro y sumarle 1 para el nuevo libro
    const nuevoId = ultimoLibro ? ultimoLibro.id_libro + 1 : 1;
    //Si la cantidad es mayor a 0 el libro esta disponible
    const disponibilidad = cantidad > 0 ? 'disponible' : 'no disponible';
   
    const libro = new LibroModel({
        id_libro:nuevoId  ,
        titulo: titulo,
        autor: autor,
        editorial: editorial,
        fecha_publicacion: fecha_publicacion,
        descripcion: descripcion,
        genero: genero,
        cantidad: cantidad,
        disponibilidad: disponibilidad,
        historial_reservas: [],
    });
    await libro.save();
    return libro;
  
}

export default createLibroAction;