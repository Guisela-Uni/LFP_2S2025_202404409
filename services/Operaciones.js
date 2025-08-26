export function obtenerOperadores(instancias) {
  const mapa = new Map();
  instancias.forEach(obj => {
    if (!mapa.has(obj.id_operador)) {
      mapa.set(obj.id_operador, obj.nombre_operador);
    }
  });
  return mapa;
}

export function obtenerClientes(instancias) {
  const mapa = new Map();
  instancias.forEach(obj => {
    if (!mapa.has(obj.id_cliente)) {
      mapa.set(obj.id_cliente, obj.nombre_cliente);
    }
  });
  return mapa;
}

export function contarOperadores(registros) {
  const totalFilas = registros.length;
  const frecuenciaPorOperador = {};

  registros.forEach(registro => {
    const nombre = registro.nombre_operador;
    if (!frecuenciaPorOperador[nombre]) {
      frecuenciaPorOperador[nombre] = 1;
    } else {
      frecuenciaPorOperador[nombre]++;
    }
  });

  return { totalFilas, frecuenciaPorOperador };
}

export function porcentaje(obtenerOperadores, totalFilas) {
  const porcentajePorOperador = {};
  for (const [nombre, frecuencia] of obtenerOperadores) {
    porcentajePorOperador[nombre] = ((frecuencia / totalFilas) * 100).toFixed(2);
  }
  return porcentajePorOperador;
}

export function contarClasificaciones(registros) {
  const conteo = {
    Buenisimo: 0,
    Regular: 0,
    Malo: 0,
    nadota: 0
  };

  registros.forEach(r => {
    const tipo = r.rendimiento;
    if (conteo.hasOwnProperty(tipo)) {
      conteo[tipo]++;
    } else {
      conteo.nadota++; // por si hay un valor inesperado
    }
  });

  console.log("-------- Clasificación de operadores --------");
  Object.entries(conteo).forEach(([tipo, cantidad]) => {
    console.log(`- ${tipo}: ${cantidad}`);
  });

  return conteo;
}

export function porcentajeClasificaciones(registros) {
  const total = registros.length;
  if (total === 0) {
    console.log("No hay registros para calcular porcentajes.");
    return;
  }

  const conteo = contarClasificaciones(registros);
  console.log("-------- Porcentaje de clasificación de operadores --------");
  Object.entries(conteo).forEach(([tipo, cantidad]) => {
    const porcentaje = ((cantidad / total) * 100).toFixed(2);
    console.log(`- ${tipo}: ${porcentaje}%`);
  });
}