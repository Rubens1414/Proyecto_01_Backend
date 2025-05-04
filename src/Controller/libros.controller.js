import createLibroAction from "../Services/create.libro.action.js";
import readLibroAction from "../Services/search.libro.action.js";
import updateLibroAction from "../Services/update.libro.action.js";
import deleteLibroAction from "../Services/delete.libro.action.js";
import allLibros from "../Services/read.libros.action.js";
import ReservarLibroAction from "../Services/reservar.libro.action.js";
import DevolverLibroAction from "../Services/devolver.libro.action.js";

//Muestra todos los libros
async function getLibros(req, res) {
    const libros = await allLibros();
    if (libros === null) {
        return res.status(404).json({
            message: "No se encontraron libros.",
        });
    }
    res.status(200).json({
        message: "Libros encontrados.",
        libros: libros,
    });
}
//crea un libro
async function createLibro(req, res) {
    const { titulo, autor, editorial, fecha_publicacion, descripcion, genero, cantidad } = req.body;
   
    if (!titulo || !autor || !editorial || !fecha_publicacion || !descripcion || !genero || !cantidad) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios.",
        });
    }
    else {
        const libro = await createLibroAction(titulo, autor, editorial, fecha_publicacion, descripcion, genero, cantidad);
        if (libro === null) {
            return res.status(404).json({
                message: "No se pudo crear el libro.",
            });
        }
        if (libro === 'Existe') {
            return res.status(400).json({
                message: "El libro ya existe.",
            });
        }
        
        res.status(201).json({
            message: "Libro creado correctamente.",
            libro: libro,
        });
    }
}

//busca un libro por id o por los demas campos
async function readLibro(req,res) {
    const { id_libro, genero, autor, titulo, editorial, fecha_publicacion } = req.query;

    const libros = await readLibroAction(id_libro, genero, autor, titulo, editorial, fecha_publicacion);
    
    if (libros === null) {
        return res.status(404).json({
            message: "No se encontraron libros con los criterios de búsqueda proporcionados.",
        });
    }
    

    if(id_libro != undefined && libros[0].id_libro == id_libro){
        return res.status(200).json({
            message: "Libro encontrado.",
            libro: libros,
        });
    }else {
        return res.status(200).json({
            message: "Libros encontrados.",
            libros: libros,
        });
    }

}

//actualiza un libro por id
async function updateLibro(req, res) {
    const { id_libro } = req.params;
    const {  titulo, autor, editorial, fecha_publicacion, descripcion, genero, cantidad,disponibilidad } = req.body;
    if(id_libro == undefined){
        return res.status(400).json({
            message: "No se ha proporcionado un  id del libro.",
        });
    }
   
    // Poner parametros por lo menos uno para que no se actualice todo el libro

    if (!titulo && !autor && !editorial && !fecha_publicacion && !descripcion && !genero && !cantidad && !disponibilidad) {
        return res.status(400).json({
            message: "No se ha proporcionado ningún campo para actualizar.",
        });
    }
    else {
        const libro = await updateLibroAction(id_libro, titulo, autor, editorial, fecha_publicacion, descripcion, genero, cantidad,disponibilidad);
        if (libro === null) {
            return res.status(404).json({
                message: "No se encontró el libro.",
            });
        }else
        if(libro === 'Inactivo'){
            return res.status(400).json({
                message: "El libro está inactivo.",
            });
        }

        res.status(200).json({
            message: "Libro actualizado correctamente.",
            libro: libro,
        });
    }
}
//borra un libro por id
async function deleteLibro(req, res) {
    const { id_libro } = req.params;
   
    if (!id_libro) {
        return res.status(400).json({
            message: "No se ha proporcionado un  id del libro.",
        });
    }
    else {
        const libro = await deleteLibroAction(id_libro);
        if (libro === null) {
            return res.status(404).json({
                message: "No se encontró el libro.",
            });
        }else
        if(libro === 'Inactivo'){
            return res.status(400).json({
                message: "El libro ya esta inactivo.",
            });
        }

        res.status(200).json({
            message: "Libro eliminado correctamente.",
            libro: libro,
        });
    }
}

//Reserva un libro por id

async function reservarLibro(req, res) {
    const { id_libro } = req.params;
    const { id_usuario } = req.user;
    if (!id_libro) {
        return res.status(400).json({
            message: "No se ha proporcionado un  id del libro.",
        });
    }
 
    const libro = await ReservarLibroAction(id_libro, id_usuario);
    if (libro === null) {
        return res.status(404).json({
            message: "No se encontró el libro.",
        });
    }
    else if (libro === 'No Disponible') {
        return res.status(400).json({
            message: "El libro no está disponible.",
        });
    }
    else if (libro === 'No Activo') {
        return res.status(400).json({
            message: "El libro no está activo.",
        });
    }
    res.status(200).json({
        message: "Libro reservado correctamente.",
        libro: libro,
    });
}
// Devuelve el libro dando su id con el ticket
async function devolverLibro(req, res) {
    const {id_libro, ticket } = req.params;
    const { id_usuario } = req.user;
    if (!id_libro) {
        return res.status(400).json({
            message: "No se ha proporcionado un  id del libro.",
        });
    }
    if (!ticket) {
        return res.status(400).json({
            message: "No se ha proporcionado un  ticket.",
        });
    }
    const libro = await DevolverLibroAction(id_libro,ticket, id_usuario);
    if (libro === 'no reservado') {
        return res.status(404).json({
            message: "Este usuario no ha reservado este libro.",
        });
    }
    if (libro === null) {
        return res.status(404).json({
            message: "No se encontró el libro o ya fue devuelto.",
        });
    }
    res.status(200).json({
        message: "Libro devuelto correctamente.",
        libro: libro,
    });
}

export {createLibro,readLibro,updateLibro,deleteLibro, getLibros, reservarLibro,devolverLibro};