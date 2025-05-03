import { Router } from "express";
import {createLibro} from "../Controller/libros.controller.js";
import {EstaLogin} from "../Middleware/auth.middleware.js";
import {readLibro} from "../Controller/libros.controller.js";
import {updateLibro} from "../Controller/libros.controller.js";
import {deleteLibro} from "../Controller/libros.controller.js";
import { getLibros } from "../Controller/libros.controller.js";
import { reservarLibro } from "../Controller/libros.controller.js";
import { devolverLibro } from "../Controller/libros.controller.js";

const LibroRouter = Router();
LibroRouter.get("/", getLibros);
LibroRouter.post("/crear", EstaLogin, createLibro);
LibroRouter.get("/buscar",  readLibro);
LibroRouter.put("/actualizar/:id_libro", EstaLogin, updateLibro);
LibroRouter.delete("/eliminar/:id_libro", EstaLogin, deleteLibro);
LibroRouter.get("/reservar/:id_libro", EstaLogin, reservarLibro);
LibroRouter.get("/devolver/:id_libro/:ticket", EstaLogin, devolverLibro);




export default LibroRouter;

