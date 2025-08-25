import fs from "fs";
import path from "path";

/**
 * Función para leer un archivo CSV y mostrarlo en consola
 * @param {string} rutaArchivo - Ruta del archivo CSV
 */
export function LeerArchivo(rutaArchivo) {
  try {
    const contenido = fs.readFileSync(path.resolve(rutaArchivo), "utf8"); //lee el archivo
    const lineas = contenido.split("\n").map(l => l.trim()).filter(l => l.length > 0); // Divide en líneas y usa trim para limpiar espacios
    const encabezados = lineas[0].split(","); //extrae los encabezados
    
    // Mapea cada línea de datos a un objeto 
    const datos = lineas.slice(1).map(linea => {
      const valores = linea.split(",");
      let fila = {};
      encabezados.forEach((col, i) => {
        fila[col] = valores[i];
      });
      return fila; 
    });

    console.log("\nRegistros de llamadas:", rutaArchivo);
    console.table(datos);  //para mostrarlo en una tablita
    return datos;          // Lo devuelve para usar después
  } catch (err) {
    console.error("Error al leer el archivo:", err.message);
    return [];
  }
}

