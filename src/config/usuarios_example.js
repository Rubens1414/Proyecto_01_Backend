import fa from "date-and-time/locale/fa";

export const UsuariosExample = [
  {
    "id_usuario": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "password": "hashedpassword1",
    "permisos": {
      "ACTUALIZAR-USUARIOS": false,
      "ELIMINAR-USUARIOS": false,
      "CREAR-LIBROS": false,
      "ACTUALIZAR-LIBROS": false,
      "ELIMINAR-LIBROS": false
    },
    "isActive": true,
    "libros_reservados": [
      {
        "id_libro": 1,
        "ticket": 1234,
        "titulo": "Cien años de soledad",
        "fecha_reserva": "2025-04-25",
        "fecha_entrega": "2025-05-10"
      }
    ]
  },
  {
    "id_usuario": 2,
    "name": "María López",
    "email": "maria.lopez@example.com",
    "password": "hashedpassword2",
    "permisos": {
      "ACTUALIZAR-USUARIOS": true,
      "ELIMINAR-USUARIOS": true,
      "CREAR-LIBROS": true,
      "ACTUALIZAR-LIBROS": true,
      "ELIMINAR-LIBROS": true
    },
    "isActive": true,
    "libros_reservados": [
      {
        "id_libro": 3,
        "ticket": 5678,
        "titulo": "Don Quijote de la Mancha",
        "fecha_reserva": "2025-04-20",
        "fecha_entrega": "2025-05-05"
      }
    ]
  },
 
]
