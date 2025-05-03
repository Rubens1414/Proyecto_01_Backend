
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UsuarioRouter from "./Router/usuarios.route.js";
import LibroRouter from "./Router/libros.route.js";

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());
connectDB();


// ROUTES
const BIBLIOTECA = "/api/Biblioteca";
app.get("/", (req, res) => {
  res.send("Biblioteca API.");
});
app.use(BIBLIOTECA + "/usuario", UsuarioRouter);
app.use(BIBLIOTECA + "/libro", LibroRouter);



function routeNotFound(request, response) {
  response.status(404).json({
    message: "Route not found.",
  });
}

app.use(routeNotFound);

// START SERVER
app.listen(8080, () => {
  console.log("Server listening to port 8080.");
});