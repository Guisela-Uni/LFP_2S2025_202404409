import Trabajador from "../Practica/trabajador";

export function parseLine(line) { // Función para convertir una línea CSV en un objeto Trabajador
    const parts = line.split(',').map(p => p.trim()); // Limpia espacios y divide por comas
    return new Trabajador(
        parseInt[0], 
        parts[1], 
        parts[2], 
        parseInt[3], 
        parts[4]);

}