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
const express = require("express");
const cors = require("cors");
const dbConnected = require("./config/db");
const tareaRoutes = require("./routes/tareas");

const app = express();
const PORT = process.env.PORT || 3000;

// Función para configurar middlewares
const configureMiddlewares = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const allowedOrigins = ["http://localhost:3000", "https://mi-dominio-frontend.com"];
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            callback(new Error("Origen no permitido por CORS"));
        },
    }));
};

configureMiddlewares();

dbConnected(); // Conexión a la base de datos

app.use("/tareas", tareaRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
