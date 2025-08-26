import readline from "readline"; 
import { LeerArchivo } from "./CargarArchivo.js";
import { ReporteHTML } from "./ExportarHistorial.js";
import { contarClasificaciones, porcentajeClasificaciones } from "./Operaciones.js";

export function IniciarMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let archivo = []; // almacena los registros cargados

  function Menu() {
    console.log("\n----------------- CONTROL DE CALL CENTER -----------------");
    console.log("| 1. Cargar Registros de Llamadas                           |");
    console.log("| 2. Generar reportes (Exportar Historial de Llamadas,      |");
    console.log("|    Listado de Operadores, Listado de Clientes y           |");
    console.log("|    Rendimiento de Operadores)                             |");
    console.log("| 3. Mostrar Porcentaje de Clasificación de Llamadas        | ");
    console.log("| 4. Mostrar Cantidad de Llamadas por Calificación          | ");
    console.log("| 5. Salir                                                  |");
    console.log(" -----------------------------------------------------------");
    rl.question("-> Seleccione una opción: ", handleMenuOption);
  }

  function handleMenuOption(opcion) {
    switch (opcion.trim()) {
        case "1":
            rl.question("Ingrese el nombre del archivo CSV: ", (nombreArchivo) => {
            archivo = LeerArchivo(nombreArchivo); // ← Aquí guardas los datos correctamente
            Menu(); 
            });
            break;
        case "2":
            if (archivo.length === 0) {
              console.log("No hay datos cargados. Por favor, cargue un archivo primero.");
            } else {
              ReporteHTML(archivo);
            }
              Menu();
            break;

        case "3":
            if (archivo.length === 0) {
              console.log("No hay datos cargados. Por favor, cargue un archivo primero.");
            } else {
              porcentajeClasificaciones(archivo);
            }
              Menu();
            break;
        case "4":
            if (archivo.length === 0) {
              console.log("No hay datos cargados. Por favor, cargue un archivo primero.");
            } else {
              contarClasificaciones(archivo);
            }
              Menu();
            break;
        case "5":
            console.log("Saliendo del programa...");
            rl.close();
            break;
        default:
            console.log("Error, opción no valida.");
            Menu();
    }
  }

  // mostrar menú al iniciar
  Menu();
}
