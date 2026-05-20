// <!DOCTYPE html>
// <html lang="es">
// <head>
//     <meta charset="UTF-8">
//     <title>Frontend VM3 - Gestión de Alumnos</title>
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//         }
        
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f5f5f5;
//             padding: 20px;
//         }
        
//         .contenedor {
//             max-width: 1200px;
//             margin: 0 auto;
//         }
        
//         h1 {
//             text-align: center;
//             color: #333;
//             margin-bottom: 30px;
//         }
        
//         /* Estilos del formulario */
//         .formulario {
//             background: white;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//             margin-bottom: 30px;
//         }
        
//         .formulario h2 {
//             margin-bottom: 20px;
//             color: #2c3e50;
//         }
        
//         .form-group {
//             margin-bottom: 15px;
//         }
        
//         label {
//             display: block;
//             margin-bottom: 5px;
//             font-weight: bold;
//             color: #555;
//         }
        
//         input {
//             width: 100%;
//             padding: 10px;
//             border: 1px solid #ddd;
//             border-radius: 5px;
//             font-size: 16px;
//         }
        
//         input:focus {
//             outline: none;
//             border-color: #3498db;
//         }
        
//         .boton-group {
//             display: flex;
//             gap: 10px;
//             margin-top: 20px;
//         }
        
//         button {
//             padding: 10px 20px;
//             border: none;
//             border-radius: 5px;
//             cursor: pointer;
//             font-size: 16px;
//             transition: all 0.3s;
//         }
        
//         .btn-guardar {
//             background-color: #2ecc71;
//             color: white;
//         }
        
//         .btn-guardar:hover {
//             background-color: #27ae60;
//         }
        
//         .btn-refrescar {
//             background-color: #3498db;
//             color: white;
//         }
        
//         .btn-refrescar:hover {
//             background-color: #2980b9;
//         }
        
//         .btn-limpiar {
//             background-color: #e74c3c;
//             color: white;
//         }
        
//         .btn-limpiar:hover {
//             background-color: #c0392b;
//         }
        
//         /* Estilos de la tabla */
//         .tabla-container {
//             background: white;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         }
        
//         .tabla-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 20px;
//         }
        
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }
        
//         th, td {
//             border: 1px solid #ddd;
//             padding: 12px;
//             text-align: left;
//         }
        
//         th {
//             background-color: #34495e;
//             color: white;
//             font-weight: bold;
//         }
        
//         tr:nth-child(even) {
//             background-color: #f9f9f9;
//         }
        
//         tr:hover {
//             background-color: #f0f0f0;
//         }
        
//         .mensaje {
//             padding: 10px;
//             margin: 10px 0;
//             border-radius: 5px;
//             display: none;
//         }
        
//         .mensaje-exito {
//             background-color: #d4edda;
//             color: #155724;
//             border: 1px solid #c3e6cb;
//         }
        
//         .mensaje-error {
//             background-color: #f8d7da;
//             color: #721c24;
//             border: 1px solid #f5c6cb;
//         }
        
//         .loading {
//             text-align: center;
//             padding: 20px;
//             color: #666;
//         }
        
//         .vacio {
//             text-align: center;
//             padding: 20px;
//             color: #999;
//         }
        
//         @media (max-width: 768px) {
//             th, td {
//                 padding: 8px;
//                 font-size: 14px;
//             }
            
//             .boton-group {
//                 flex-direction: column;
//             }
            
//             button {
//                 width: 100%;
//             }
//         }
//     </style>
// </head>
// <body>
//     <div class="contenedor">
//         <h1>📚 Sistema de Gestión de Alumnos</h1>
        
//         <!-- Mensajes de notificación -->
//         <div id="mensaje" class="mensaje"></div>
        
//         <!-- Formulario para agregar alumnos -->
//         <div class="formulario">
//             <h2>➕ Agregar Nuevo Alumno</h2>
//             <form id="formAlumno">
//                 <div class="form-group">
//                     <label for="apellido">Apellido:</label>
//                     <input type="text" id="apellido" name="apellido" required placeholder="Ingrese el apellido">
//                 </div>
                
//                 <div class="form-group">
//                     <label for="nombre">Nombre:</label>
//                     <input type="text" id="nombre" name="nombre" required placeholder="Ingrese el nombre">
//                 </div>
                
//                 <div class="form-group">
//                     <label for="dni">DNI:</label>
//                     <input type="text" id="dni" name="dni" required placeholder="Ingrese el DNI (solo números)">
//                 </div>
                
//                 <div class="boton-group">
//                     <button type="submit" class="btn-guardar">💾 Guardar Alumno</button>
//                     <button type="button" class="btn-limpiar" onclick="limpiarFormulario()">🗑️ Limpiar Formulario</button>
//                 </div>
//             </form>
//         </div>
        
//         <!-- Tabla de alumnos -->
//         <div class="tabla-container">
//             <div class="tabla-header">
//                 <h2>📋 Lista de Alumnos</h2>
//                 <button class="btn-refrescar" onclick="cargarAlumnos()">🔄 Refrescar</button>
//             </div>
            
//             <div id="tablaContainer">
//                 <table id="tablaAlumnos">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Apellido</th>
//                             <th>Nombre</th>
//                             <th>DNI</th>
//                         </tr>
//                     </thead>
//                     <tbody id="cuerpoTabla">
//                         <tr>
//                             <td colspan="4" class="loading">Cargando datos...</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>

//     <script>
//         // Configuración - CAMBIA ESTA IP por la de tu VM2
//         const API_URL = 'http://10.254.196.230:3454';
        
//         // Función para mostrar mensajes
//         function mostrarMensaje(texto, tipo) {
//             const mensajeDiv = document.getElementById('mensaje');
//             mensajeDiv.textContent = texto;
//             mensajeDiv.className = `mensaje mensaje-${tipo}`;
//             mensajeDiv.style.display = 'block';
            
//             setTimeout(() => {
//                 mensajeDiv.style.display = 'none';
//             }, 3000);
//         }
        
//         // Función para limpiar el formulario
//         function limpiarFormulario() {
//             document.getElementById('apellido').value = '';
//             document.getElementById('nombre').value = '';
//             document.getElementById('dni').value = '';
//         }
        
//         // Función para cargar todos los alumnos (GET)
//         async function cargarAlumnos() {
//             const tbody = document.getElementById('cuerpoTabla');
//             tbody.innerHTML = '<tr><td colspan="4" class="loading">🔄 Cargando datos...</td></tr>';
            
//             try {
//                 const response = await fetch(`${API_URL}/consultarAlumnos`);
                
//                 if (!response.ok) {
//                     throw new Error(`Error HTTP: ${response.status}`);
//                 }
                
//                 const data = await response.json();
                
//                 // Limpiar tabla
//                 tbody.innerHTML = '';
                
//                 // Verificar si hay datos
//                 if (data.length === 0) {
//                     tbody.innerHTML = '<tr><td colspan="4" class="vacio">📭 No hay alumnos registrados</td></tr>';
//                     return;
//                 }
                
//                 // Recorrer cada alumno y crear fila
//                 data.forEach(alumno => {
//                     const row = document.createElement('tr');
//                     row.innerHTML = `
//                         <td>${alumno.id}</td>
//                         <td>${alumno.apellido || ''}</td>
//                         <td>${alumno.nombre || ''}</td>
//                         <td>${alumno.dni || ''}</td>
//                     `;
//                     tbody.appendChild(row);
//                 });
                
//                 console.log(`✅ Cargados ${data.length} alumnos`);
                
//             } catch (error) {
//                 console.error('Error al cargar alumnos:', error);
//                 tbody.innerHTML = `<tr><td colspan="4" class="vacio">❌ Error de conexión: ${error.message}</td></tr>`;
//                 mostrarMensaje('Error al conectar con el servidor', 'error');
//             }
//         }
        
//         // Función para guardar un nuevo alumno (POST)
//         async function guardarAlumno(apellido, nombre, dni) {
//             try {
//                 const response = await fetch(`${API_URL}/grabaAlumnos`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         apellido: apellido,
//                         nombre: nombre,
//                         dni: dni
//                     })
//                 });
                
//                 const resultado = await response.text();
                
//                 if (resultado === '1') {
//                     mostrarMensaje('✅ ¡Alumno guardado exitosamente!', 'exito');
//                     limpiarFormulario();
//                     cargarAlumnos(); // Recargar la tabla automáticamente
//                     return true;
//                 } else {
//                     mostrarMensaje('❌ Error: El DNI ya existe o hay un problema con los datos', 'error');
//                     return false;
//                 }
                
//             } catch (error) {
//                 console.error('Error al guardar:', error);
//                 mostrarMensaje('❌ Error de conexión al guardar el alumno', 'error');
//                 return false;
//             }
//         }
        
//         // Evento del formulario
//         document.getElementById('formAlumno').addEventListener('submit', async (e) => {
//             e.preventDefault(); // Evitar que recargue la página
            
//             const apellido = document.getElementById('apellido').value.trim();
//             const nombre = document.getElementById('nombre').value.trim();
//             const dni = document.getElementById('dni').value.trim();
            
//             // Validaciones
//             if (!apellido || !nombre || !dni) {
//                 mostrarMensaje('⚠️ Por favor, complete todos los campos', 'error');
//                 return;
//             }
            
//             if (!/^\d+$/.test(dni)) {
//                 mostrarMensaje('⚠️ El DNI debe contener solo números', 'error');
//                 return;
//             }
            
//             // Botón de guardar (feedback visual)
//             const btnGuardar = document.querySelector('.btn-guardar');
//             const textoOriginal = btnGuardar.textContent;
//             btnGuardar.textContent = '⏳ Guardando...';
//             btnGuardar.disabled = true;
            
//             await guardarAlumno(apellido, nombre, dni);
            
//             btnGuardar.textContent = textoOriginal;
//             btnGuardar.disabled = false;
//         });
        
//         // Cargar alumnos automáticamente al abrir la página
//         cargarAlumnos();
        
//         // Recargar alumnos cada 30 segundos (opcional)
//         setInterval(() => {
//             cargarAlumnos();
//         }, 30000);
//     </script>
// </body>
// </html>