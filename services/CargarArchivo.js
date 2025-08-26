import fs from "fs";
import path from "path";
import CallCenter from "../Practica/CallCenter.js";
/**
 * Función para leer un archivo CSV y mostrarlo en consola
 * @param {string} rutaArchivo - Ruta del archivo CSV
 */

export function LeerArchivo(rutaArchivo) {
  try {
    const contenido = fs.readFileSync(path.resolve(rutaArchivo), "utf8"); //lee el archivo
    const lineas = contenido.split("\n").map(l => l.trim()).filter(l => l.length > 0); // Divide en líneas y usa trim para limpiar espacios
    const encabezados = lineas[0].split(",").map(e=> e.trim()); //extrae los encabezados
    
    // Mapea cada línea de datos a un objeto 
    const datos = lineas.slice(1).map(linea => {
      const valores = linea.split(",").map(e => e.trim());
      let fila = {};
      encabezados.forEach((col, i) => {
        fila[col] = valores[i];
      });


     return new CallCenter(
        fila["id_operador"],
        fila["nombre_operador"],
        fila["estrellas"],
        fila["id_cliente"],
        fila["nombre_cliente"]
      );
    });

    console.log("\nRegistros de llamadas:", rutaArchivo);
    console.table(datos.map(r => ({
      id_operador: r.id_operador,
      nombre_operador: r.nombre_operador,
      estrellas: `${r.estrellas}`,
      id_cliente: r.id_cliente,
      nombre_cliente: r.nombre_cliente
    })));

    return datos;
  } catch (err) {
    console.error("Error al leer el archivo:", err.message);
    return [];
  }

}

