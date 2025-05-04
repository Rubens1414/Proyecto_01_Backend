
import { LibroModel } from "../Models/libro.model.js";
import { UsuarioModel } from "../Models/usuario.model.js";
import date  from 'date-and-time';



async function ReservarLibroAction(id_libro, id_usuario) {
    const usuario = await UsuarioModel.findOne({ id_usuario: id_usuario });
    const libro = await LibroModel.findOne({ id_libro: id_libro });
    if (!libro) {
        console.log("No se encontró el libro.");    
        return null;
    }

    if (libro.isActive === false) {
        console.log("El libro no está activo.");
        return "No Activo";
    }
    if (libro.disponibilidad === "no disponible") {
        console.log("El libro no está disponible.");
        return "No Disponible";
    }
    const cantidad = libro.cantidad - 1;
    
    const disponibilidad = cantidad > 0 ? 'disponible' : 'no disponible';
    // Generar un ticket aleatorio de 4 dígitos
    const ticket = Math.floor(Math.floor(Math.random() * 9000) + 1000);
    // Verificar si el ticket ya existe en el historial de reservas del libro y si el libro no ha sido devuelto
    const libro_con_ticket_igual = await LibroModel.findOne({ historial_reservas:{$elemMatch:{id_usuario: id_usuario, ticket:ticket, fecha_entrega: null} }});

    if (libro_con_ticket_igual) {
        console.log("El ticket ya existe, generando uno nuevo.");
        return ReservarLibroAction(id_libro, id_usuario);
    }
 
    const libroActualizado = await LibroModel.findOneAndUpdate(
        { id_libro: id_libro },
        { $set: { cantidad: cantidad, disponibilidad: disponibilidad 
        },
        $push: {
            historial_reservas: {
                id_usuario: id_usuario,
                ticket:ticket,
                nombre_usuario: usuario.name,
                fecha_reserva: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                fecha_entrega: null,
            },
        } },
        { new: true }
    );
    const usera=await UsuarioModel.findOneAndUpdate(
        { id_usuario: id_usuario },
        { $push: {
            libros_reservados: {
                id_libro: id_libro,
                ticket: ticket,
                titulo: libro.titulo,
                fecha_reserva: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                fecha_entrega: null,
            },
        } },
        { new: true }
      
    );

    return libroActualizado;
}
export default ReservarLibroAction;