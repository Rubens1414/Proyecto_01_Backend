import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {UsuarioModel} from '../Models/usuario.model.js';
import {LibroModel} from '../Models/libro.model.js';
import {UsuariosExample} from '../config/usuarios_example.js';
import {LibrosExample} from '../config/libros_example.js';

dotenv.config(); 

console.log('MongoDB URI:', process.env.MONGO_URI);

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await seedUsuario();
    await seedLibros();
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
}
async function seedUsuario() {
    const usersCount = await UsuarioModel.countDocuments();
    if (usersCount>0){
        console.log('Usuarios de ejemplo ya implementados');
        return;
    }
    for (let user of UsuariosExample){
        
        await UsuarioModel.create(user);
        
    }
    console.log('Usuarios de ejemplo implementados');
}

async function seedLibros() {
    const libroCount = await LibroModel.countDocuments();
    if (libroCount>0){
        console.log('Libros de ejemplo ya implementados');
        return;
    }
    for (let libro of LibrosExample){
        await LibroModel.create(libro);
    }
    console.log('Libros de ejemplo ya implementados');
}

export default connectDB;
