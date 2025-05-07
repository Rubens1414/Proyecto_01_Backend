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
    console.log(filters);
 
    
    if (Object.keys(filters).length === 0) {
        
        return "Sin filtros";
    }
    //si filtros tiene isActive y es false, busca los libros inactivos
    if(Object.keys(filters).includes("isActive") === true){
        console.log('si tiene isActive');
        if(filters.isActive === "false"){
            console.log('es false');
            const libros = await LibroModel.find({...filters, isActive: false});
            return libros;
        }else if(filters.isActive === "true"){
            console.log('es true');
            const libros = await LibroModel.find({...filters, isActive: true});
            return libros;
        }

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