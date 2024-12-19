// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();
// //diseño
// const app = express();

// // Configuración de CORS
// const corsOptions = {
//     origin: "*", // Dominio del frontend en Vercel o * para probar
//     methods: "GET,POST,PUT,DELETE", // Métodos permitidos
//     allowedHeaders: "Content-Type,Authorization", // Cabeceras permitidas
// };

// app.use(cors(corsOptions));

// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/", require("./routes/tareas.js"));


// // Conexión a MongoDB
// mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Conectado a MongoDB"))
//     .catch((error) => console.error("Error al conectar a MongoDB:", error));

// // Rutas
// const tareasRoutes = require("./routes/tareas");
// app.use("/tareas", tareasRoutes);

// // Puerto
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();

// Permitir los orígenes que necesites
const allowedOrigins = [
    'https://proyecto-final-todo-en-orden-frontend.vercel.app', // Dominio de tu frontend en producción
    'http://localhost:3000', // Dominio de tu frontend local (opcional, para pruebas locales)
];

// Configurar CORS
const corsOptions = {
    origin: (origin, callback) => {
        // Permitir solicitudes sin origen (por ejemplo, herramientas como Postman)
        if (!origin) return callback(null, true);

        // Comprobar si el origen está en la lista de permitidos
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'El CORS bloqueó este origen porque no está permitido.';
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Habilitar credenciales si es necesario (opcional)
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tus rutas
const tareasRoutes = require('./routes/tareas');
app.use('/tareas', tareasRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Conexión del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
