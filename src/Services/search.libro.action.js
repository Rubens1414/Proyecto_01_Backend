import { LibroModel } from "../Models/libro.model.js";



async function readLibroAction(id_libro, genero, autor, titulo, editorial, fecha_publicacion,isActive) {
    // agrega los filtros que si estan 
    const filters = {
        ...(id_libro && { id_libro: id_libro }),
        ...(genero && { genero: genero }),
        ...(autor && { autor: autor }),
        ...(titulo && { titulo: titulo }),
        ...(editorial && { editorial: editorial }),
        ...(fecha_publicacion && { fecha_publicacion: fecha_publicacion }),
        ...(isActive && { isActive: isActive })
    };
 
    
    if (Object.keys(filters).length === 0) {
        
        return "Sin filtros";
    }
    //si filtros tiene isActive y es false, busca los libros inactivos
    if(!Object.keys(filters).includes("isActive") === false && isActive === false){
        console.log('no tiene isActive');
        const libros = await LibroModel.find({...filters,isActive: false});

        return libros;
    }
    //Busca los libros activos con los filtros que se le pasaron
    const libros = await LibroModel.find({...filters,isActive: true});
    

    if (libros.length === 0) {
       
        return null;
    }

    
    return libros;

}

export default readLibroAction;