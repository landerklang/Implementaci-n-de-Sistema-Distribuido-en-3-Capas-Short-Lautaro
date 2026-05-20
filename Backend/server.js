const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración del pool de conexiones a MariaDB/MySQL
const pool = mysql.createPool({
    host: 'localhost',           // Si la BD está en la misma VM2
    user: 'root',                // Tu usuario de BD
    password: 'tu_password',                // Tu contraseña (déjala vacía si no tiene)
    database: 'escuela',         // Nombre de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

// Probar conexión a la base de datos al iniciar
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error conectando a MariaDB:", err.message);
        process.exit(1);
    }
    console.log("✅ Conectado a MariaDB correctamente");
    connection.release();
});

// ============================================
// Ruta GET: Consultar todos los alumnos
// ============================================
app.get("/consultarAlumnos", (req, res) => {
    const sql = "SELECT * FROM alumnos ORDER BY apellido ASC, nombre ASC";
    
    pool.query(sql, (error, resultados) => {
        if (error) {
            console.error("Error en consulta GET:", error);
            return res.status(500).json({ 
                error: "Error al consultar la base de datos",
                detalle: error.message 
            });
        }
        
        console.log(`📊 Se enviaron ${resultados.length} alumnos`);
        res.json(resultados);
    });
});

// ============================================
// Ruta POST: Grabar un nuevo alumno
// ============================================
app.post("/grabaAlumnos", (req, res) => {
    const { apellido, nombre, dni } = req.body;
    
    console.log("📝 Datos recibidos para guardar:", { apellido, nombre, dni });
    
    // Validar que llegaron todos los datos
    if (!apellido || !nombre || !dni) {
        console.log("❌ Faltan datos:", { apellido, nombre, dni });
        return res.status(400).send("Faltan datos: apellido, nombre o dni");
    }
    
    // PASO 1: Verificar si el DNI ya existe
    const verificarSQL = "SELECT COUNT(*) AS cantidad FROM alumnos WHERE dni = ?";
    
    pool.query(verificarSQL, [dni], (error, resultado) => {
        if (error) {
            console.log("❌ Error al verificar DNI:", error);
            return res.send("0");
        }
        
        // Si el DNI ya existe (cantidad > 0)
        if (resultado[0].cantidad > 0) {
            console.log(`⚠️ El DNI ${dni} ya existe en la base de datos`);
            return res.send("0");
        }
        
        // PASO 2: Insertar el nuevo alumno
        const insertarSQL = "INSERT INTO alumnos (apellido, nombre, dni) VALUES (?, ?, ?)";
        
        pool.query(insertarSQL, [apellido, nombre, dni], (error2, resultado2) => {
            if (error2) {
                console.log("❌ Error al insertar alumno:", error2);
                return res.send("0");
            }
            
            console.log(`✅ Alumno insertado correctamente. ID: ${resultado2.insertId}`);
            return res.send("1");
        });
    });
});

// ============================================
// Ruta DELETE: Eliminar un alumno por ID (opcional)
// ============================================
app.delete("/eliminarAlumno/:id", (req, res) => {
    const { id } = req.params;
    
    const sql = "DELETE FROM alumnos WHERE id = ?";
    
    pool.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error("Error al eliminar:", error);
            return res.status(500).send("0");
        }
        
        if (resultado.affectedRows === 0) {
            return res.send("0");
        }
        
        console.log(`🗑️ Alumno con ID ${id} eliminado`);
        res.send("1");
    });
});

// ============================================
// Iniciar el servidor
// ============================================
app.listen(3454, "0.0.0.0", () => {
    console.log("🚀 Servidor corriendo en puerto 3454");
    console.log("📡 Escuchando en todas las interfaces (0.0.0.0)");
    console.log("📍 Endpoints disponibles:");
    console.log("   GET  → http://localhost:3454/consultarAlumnos");
    console.log("   POST → http://localhost:3454/grabaAlumnos");
    console.log("   DELETE → http://localhost:3454/eliminarAlumno/:id");
});