
---

### **README para el Backend**

```markdown
# Proyecto Final - Todo en Orden (Backend)

## Descripción
Este es el backend de la aplicación "Todo en Orden", desarrollado con **Node.js** y **Express** para gestionar las peticiones HTTP, y utilizando **MongoDB** como base de datos. Está desplegado en **Render**.

## Tecnologías utilizadas
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para la creación de rutas y lógica del servidor.
- **MongoDB**: Base de datos no relacional.
- **Render**: Para el despliegue del backend.

## Cómo correr el proyecto
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/usuario/backend-repo.git
   cd backend-repo

2. **Instalar dependencias**
npm install

3. **Configurar variables de entorno:**
Crea un archivo .env en la raíz del proyecto

4. **Iniciar el servidor:**
npm start
Endpoints del API
GET /tareas:

Descripción: Obtiene todas las tareas.
Respuesta: Lista de tareas en formato JSON.
POST /tareas:

Descripción: Crea una nueva tarea.
Parámetros requeridos: tarea, descripcion, prioridad, estado.
PUT /tareas/:id:

Descripción: Actualiza una tarea por su ID.
Parámetros requeridos: tarea, descripcion, prioridad, estado.
DELETE /tareas/:id:

Descripción: Elimina una tarea por su ID.
Despliegue
El backend está desplegado en Render:

URL: https://proyecto-final-todo-en-orden-backend.onrender.com
Flujo de trabajo
Recepción de peticiones: El backend recibe las peticiones del frontend.
Procesamiento de datos: Los datos se procesan y se almacenan/actualizan/eliminan en MongoDB.
Respuesta al frontend: El backend envía la información procesada al frontend.
