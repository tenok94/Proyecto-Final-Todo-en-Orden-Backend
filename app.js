const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
//diseño
const app = express();

// Configuración de CORS
const corsOptions = {
    origin: "*", // Dominio del frontend en Vercel o * para probar
    methods: "GET,POST,PUT,DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type,Authorization", // Cabeceras permitidas
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/tareas.js"));


// Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Rutas
const tareasRoutes = require("./routes/tareas");
app.use("/tareas", tareasRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
