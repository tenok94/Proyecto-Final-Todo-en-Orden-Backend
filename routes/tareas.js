// const express = require("express");
// const router = express.Router();
// const ModelTarea = require("../models/tareamodel.js");

// //mostrar las tareas :D
// router.get("/tareas", async (req, res) => {
//     try {
//         const tareas = await ModelTarea.find();
//         res.status(200).send(tareas)
//     } catch (error) {
//         res.status(500).send({ mensaje : "no se encontraron tareas", error });
//     }
// })

// //crear una tarea
// router.post("/tareas", async (req, res) => {
//     try {
//         const nuevaTarea = new ModelTarea(req.body);
//         await nuevaTarea.save();
//         res.status(201).send(nuevaTarea);
//     } catch (error) {
//         res.status(400).send({ mensaje: "Error al crear la tarea", error });
//     }
// });

// //actualizar una tarea
// router.put("/tareas/:id", async (req, res) => {
//     try {
//         const tareaActualizada = await ModelTarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!tareaActualizada) {
//             return res.status(404).send({ mensaje: "Tarea no encontrada" });
//         }
//         res.status(200).send(tareaActualizada);
//     } catch (error) {
//         res.status(400).send({ mensaje: "Error al actualizar la tarea", error });
//     }
// });

// //eliminar una tarea
// router.delete("/tareas/:id", async (req, res) => {
//     try {
//         const tareaEliminada = await ModelTarea.findByIdAndDelete(req.params.id);
//         if (!tareaEliminada) {
//             return res.status(404).send({ mensaje: "Tarea no encontrada" });
//         }
//         res.status(200).send({ mensaje: "Tarea eliminada", tarea: tareaEliminada });
//     } catch (error) {
//         res.status(500).send({ mensaje: "Error al eliminar la tarea", error });
//     }
// });

// //marcar tarea como completada
// router.patch("/tareas/:id/completar", async (req, res) => {
//     try {
//         const tareaCompletada = await ModelTarea.findByIdAndUpdate(
//             req.params.id, 
//             { estado: "Finalizada", fechaFinalizada: Date.now() }, 
//             { new: true }
//         );
//         if (!tareaCompletada) {
//             return res.status(404).send({ mensaje: "Tarea no encontrada" });
//         }
//         res.status(200).send(tareaCompletada);
//     } catch (error) {
//         res.status(400).send({ mensaje: "Error al marcar la tarea como completada", error });
//     }
// });

// // ENDPOINT DE NEGOCIO:

// //obtener tareas por prioridad
// router.get("/tareas/prioridad/:prioridad", async (req, res) => {
//     const { prioridad } = req.params;
//     try {
//         const tareas = await ModelTarea.find({ prioridad: prioridad });
//         if (tareas.length === 0) {
//             return res.status(404).send({ mensaje: "No se encontraron tareas con esa prioridad" });
//         }
//         res.status(200).send(tareas);
//     } catch (error) {
//         res.status(500).send({ mensaje: "Error al obtener tareas por prioridad", error });
//     }
// });

// // GET /tareas/estado/:estado - Obtener tareas por estado
// router.get("/tareas/estado/:estado", async (req, res) => {
//     const { estado } = req.params;
//     try {
//         const tareas = await ModelTarea.find({ estado: estado });
//         if (tareas.length === 0) {
//             return res.status(404).send({ mensaje: "No se encontraron tareas con ese estado" });
//         }
//         res.status(200).send(tareas);
//     } catch (error) {
//         res.status(500).send({ mensaje: "Error al obtener tareas por estado", error });
//     }
// });

// module.exports = router;
const express = require("express");
const ModelTarea = require("../models/tareamodel");
const router = express.Router();

// Crear una nueva tarea
router.post("/", async (req, res) => {
    try {
        const tarea = new ModelTarea(req.body);
        const nuevaTarea = await tarea.save();
        res.status(201).json(nuevaTarea);
    } catch (err) {
        console.error("Error al crear tarea:", err.message);
        res.status(400).json({ error: "No se pudo crear la tarea" });
    }
});

// Obtener todas las tareas
router.get("/", async (req, res) => {
    try {
        const tareas = await ModelTarea.find();
        res.json(tareas);
    } catch (err) {
        console.error("Error al obtener tareas:", err.message);
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
});

// Actualizar una tarea
router.put("/:id", async (req, res) => {
    try {
        const tareaActualizada = await ModelTarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tareaActualizada) return res.status(404).json({ error: "Tarea no encontrada" });
        res.json(tareaActualizada);
    } catch (err) {
        console.error("Error al actualizar tarea:", err.message);
        res.status(400).json({ error: "No se pudo actualizar la tarea" });
    }
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
    try {
        const tareaEliminada = await ModelTarea.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) return res.status(404).json({ error: "Tarea no encontrada" });
        res.json({ mensaje: "Tarea eliminada exitosamente" });
    } catch (err) {
        console.error("Error al eliminar tarea:", err.message);
        res.status(500).json({ error: "No se pudo eliminar la tarea" });
    }
});

module.exports = router;
