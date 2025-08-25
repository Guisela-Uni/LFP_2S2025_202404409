import fs from 'fs';

export function mostrarHistorialEnConsola(archivo) {
    console.log('=== Historial de Llamadas ===');
    console.log('ID Operador | Nombre Operador | Estrellas | ID Cliente | Nombre Cliente');
    console.log('---------------------------------------------------------------');

    archivo.forEach(r => {
        console.log(`${r.id_operador} | ${r.nombre_operador} | ${r.estrellas} | ${r.id_cliente} | ${r.nombre_cliente}`);
    });
}


export function ReporteHTML(archivo){
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
                    <th>ID Cliente</th>
                    <th>Nombre Cliente</th>
                </tr>
        `;

        archivo.forEach(r => {
            html += `
                <tr>
                    <td>${r.id_operador}</td>
                    <td>${r.nombre_operador}</td>
                    <td>${r.estrellas}</td>
                    <td>${r.id_cliente}</td>
                    <td>${r.nombre_cliente}</td>
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