import { Router } from "express";
import {createLibro} from "../Controller/libros.controller.js";
import {EstaLogin, permisoCrearLibro, permisoActualizarLibro, permisoEliminarLibro} from "../Middleware/auth.middleware.js";
import {readLibro} from "../Controller/libros.controller.js";
import {updateLibro} from "../Controller/libros.controller.js";
import {deleteLibro} from "../Controller/libros.controller.js";
import { getLibros } from "../Controller/libros.controller.js";
import { reservarLibro } from "../Controller/libros.controller.js";
import { devolverLibro } from "../Controller/libros.controller.js";

const LibroRouter = Router();
//Rutas de libros
//Muestra todos los libros
LibroRouter.get("/", getLibros);
//Crear un libro 
LibroRouter.post("/crear", EstaLogin,permisoCrearLibro, createLibro);
//Buscar un libro por id o por filtros
LibroRouter.get("/buscar/",  readLibro);
//Actualizar un libro por  su id
LibroRouter.put("/actualizar/:id_libro", EstaLogin,permisoActualizarLibro, updateLibro);
//Eliminar un libro por su id
LibroRouter.delete("/eliminar/:id_libro", EstaLogin,permisoEliminarLibro, deleteLibro);
//Reservar un libro por su id y devuelve un ticket
LibroRouter.get("/reservar/:id_libro", EstaLogin, reservarLibro);
//Devolver un libro por su id y el ticket
LibroRouter.get("/devolver/:id_libro/:ticket", EstaLogin, devolverLibro);

export default LibroRouter;

