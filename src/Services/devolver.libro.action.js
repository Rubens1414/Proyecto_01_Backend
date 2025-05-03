import { LibroModel } from "../Models/libro.model.js";
import { UsuarioModel } from "../Models/usuario.model.js";
import date  from 'date-and-time';

async function DevolverLibroAction(id_libro,ticket, id_usuario) {
    
    const libro = await LibroModel.findOne({id_libro,historial_reservas:{$elemMatch:{id_usuario: id_usuario, ticket:ticket,fecha_entrega: null}}});   
    const usuario = await UsuarioModel.findOne({id_usuario, libros_reservados:{$elemMatch:{id_libro:id_libro,ticket:ticket, fecha_entrega: null}}});

    if(!libro) {
        console.log("No se encontró el libro.");    
        return null;
    }
    if(!usuario) {
        console.log("No se encontró el usuario.");    
        return "no reservado";
    }
    const cantidad = libro.cantidad + 1;
   
    const disponibilidad = cantidad > 0 ? 'disponible' : 'no disponible';
    const libroActualizado = await LibroModel.findOneAndUpdate(
        { id_libro: id_libro, "historial_reservas.ticket": ticket },
        { $set: { cantidad:cantidad, disponibilidad: disponibilidad ,"historial_reservas.$.fecha_entrega":  date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')  },
        } ,
        { new: true }
    );
    await UsuarioModel.findOneAndUpdate(
        { id_usuario: id_usuario, libros_reservados:{$elemMatch:{ticket:ticket, fecha_entrega: null}}  },
        { $set: { "libros_reservados.$.fecha_entrega": 
         date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')  },
        },
        { new: true }
    );

   
    return libroActualizado;
}

export default DevolverLibroAction ;