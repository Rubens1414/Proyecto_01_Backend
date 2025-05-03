import createLibroAction from "../Services/create.libro.action.js";
import readLibroAction from "../Services/search.libro.action.js";
import updateLibroAction from "../Services/update.libro.action.js";
import deleteLibroAction from "../Services/delete.libro.action.js";
import allLibros from "../Services/read.libros.action.js";


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



async function createLibro(req, res) {
    const { titulo, autor, editorial, fecha_publicacion, descripcion, genero, cantidad } = req.body;
    const {isAdmin} = req.user;
    if(isAdmin == false){
        return res.status(403).json({
            message: "No tienes permisos para crear libros.",
        });
    }
    else if (!titulo || !autor || !editorial || !fecha_publicacion || !descripcion || !genero || !cantidad) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios.",
        });
    }
    else {
        const libro = await createLibroAction(titulo, autor, editorial, fecha_publicacion, descripcion, genero, cantidad);
        res.status(201).json({
            message: "Libro creado correctamente.",
            libro: libro,
        });
    }
}

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

async function updateLibro(req, res) {
    const { id_libro } = req.params;
    const {  titulo, autor, editorial, fecha_publicacion, descripcion, genero, cantidad,disponibilidad } = req.body;
    const {isAdmin} = req.user;
    if(id_libro == undefined){
        return res.status(400).json({
            message: "No se ha proporcionado un  id del libro.",
        });
    }
    if(isAdmin == false){
        return res.status(403).json({
            message: "No tienes permisos para actualizar libros.",
        });
    }
    else if (!id_libro || !titulo || !autor || !editorial || !fecha_publicacion || !descripcion || !genero || !cantidad) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios.",
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

async function deleteLibro(req, res) {
    const { id_libro } = req.params;
    const {isAdmin} = req.user;
    if(isAdmin == false){
        return res.status(403).json({
            message: "No tienes permisos para eliminar libros.",
        });
    }
    else if (!id_libro) {
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

export {createLibro,readLibro,updateLibro,deleteLibro, getLibros};