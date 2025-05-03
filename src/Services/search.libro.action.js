import { LibroModel } from "../Models/libro.model.js";



async function readLibroAction(id_libro, genero, autor, titulo, editorial, fecha_publicacion) {
   
   
      
    const filters = {
        ...(id_libro && { id_libro: id_libro }),
        ...(genero && { genero: genero }),
        ...(autor && { autor: autor }),
        ...(titulo && { titulo: titulo }),
        ...(editorial && { editorial: editorial }),
        ...(fecha_publicacion && { fecha_publicacion: fecha_publicacion })
    };
    console.log(Object.keys(filters))

    if (Object.keys(filters).length === 0) {
        
        return null;
    }

    

    const libros = await LibroModel.find({...filters,isActive: true});

    if (libros.length === 0) {
       
        return null;
    }

    

 

    return libros;

}

export default readLibroAction;