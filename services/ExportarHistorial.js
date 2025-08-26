import fs from 'fs';
import { obtenerOperadores, obtenerClientes, porcentaje } from './Operaciones.js';
    
export function ReporteHTML(archivo){
    const Operadores = obtenerOperadores(archivo); // ← Map con ID y nombre
    const Clientes = obtenerClientes(archivo); // ← Map con ID y nombre
    
    let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Historial de Llamadas</title>
            <style>
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>

            <h1>Historial de Llamadas</h1>
            <table>
                <tr>
                    <th>ID Operador</th>
                    <th>Nombre Operador</th>
                    <th>Estrellas</th>
                    <th>Rendimiento</th>
                    <th>ID Cliente</th>
                    <th>Nombre Cliente</th>
                </tr>
        `;

        archivo.forEach(r => {
            html += `
                <tr>
                    <td>${r.id_operador}</td>
                    <td>${r.nombre_operador}</td>
                    <td>${r.estrellas} estrellas</td>
                    <td>${r.estrellas >= 5 ? 'Buenisimo' : r.estrellas >= 3 ? 'Regular' : r.estrellas >= 1 ? 'Malo' : 'Malo'}</td>
                    <td>${r.id_cliente}</td>
                    <td>${r.nombre_cliente}</td>
                </tr>
            `;
        });
        html += `
            </table>



            <h1>Listado de Operadores</h1>
            <table>
                <tr>
                    <th>ID Operador</th>
                    <th>Nombre Operador</th>
                </tr>
            `;

    Operadores.forEach((nombre, id) => {
        html += `
            <tr>
                <td>${id}</td>
                <td>${nombre}</td>
            </tr>
            `;
        });

        html += `
            </table>
        
            <h1>Listado de clientes</h1>
            <table>
                <tr>
                    <th>ID Cliente</th>
                    <th>Nombre Cliente</th>
                </tr>
        `;

        Clientes.forEach(r => {
            html += `
                <tr>                    
                    <td>${r.id}</td>
                    <td>${r.nombre}</td>
                </tr>
            `;
        });

        html += `
            </table>



        <h1>Rendimiento de Operadores</h1>
            <table>
                <tr>
                    <th>ID Operador</th>
                    <th>Nombre Operador</th>
                    <th>Porcentaje de atención</th>
                </tr>
        `;

        Object.entries(porcentaje(Operadores, archivo.length)).forEach(([nombre]) => {
            const id = [...Operadores].find(([_, n]) => n === nombre)[0];
            const porcentaje = (([...Operadores].find(([_, n]) => n === nombre)[1] / archivo.length) * 100).toFixed(2);
            html += `
                <tr>                    
                    <td>${id}</td>
                    <td>${nombre}</td>
                    <td>${porcentaje}%</td>
                </tr>
            `;
        });
        html += `
            </table>

        </body>
        </html>
        `;

        if (!fs.existsSync('./reportes')) {
            fs.mkdirSync('./reportes');
        }


        fs.writeFileSync('./reportes/historial.html', html);
        console.log('Reporte HTML generado en /reportes/historial.html');
}