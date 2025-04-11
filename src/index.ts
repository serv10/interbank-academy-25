import fs from "fs";

import { rutaArchivoCSV } from "./config/config.ts";
import type { Transaccion } from "./interfaces/transaccionInterface.ts";
import {
  calcularBalanceFinal,
  obtenerNumTransaccionesPorTipo,
  obtenerTransaccionConMayorMonto,
} from "./services/transaccionService.ts";
import { leerArchivoCSV } from "./utils/archivoUtil.ts";

// Obtenemos los argumentos de la línea de comandos a partir de la posición 2
const args = process.argv.slice(2);

// Variable donde se almacenará la ruta del archivo CSV
let archivoCSV: string = "";

if (args.length > 1) {
  // Si se pasa más de un argumento, finaliza la ejecución
  console.error("Demasiados argumentos. Solo se permite uno (o ninguno).");
  process.exit(1);
} else if (args.length === 1) {
  archivoCSV = args[0]; // Se utiliza la ruta pasada como argumento
} else {
  archivoCSV = rutaArchivoCSV; // Se usa la ruta por defecto dentro del proyecto
}

// Verificamos si existe el archivo
if (!fs.existsSync(archivoCSV)) {
  console.error("El archivo CSV no existe en la ruta especificada.");
  process.exit(1);
}

// Se lee el archivo y se ejecutan los cálculos solicitados
leerArchivoCSV(archivoCSV, (transacciones: Transaccion[]) => {
  const balanceFinal = calcularBalanceFinal(transacciones);
  const transaccionMayorMonto = obtenerTransaccionConMayorMonto(transacciones);
  const numTransaccionesDebito = obtenerNumTransaccionesPorTipo(
    transacciones,
    "débito",
  );
  const numTransaccionesCredito = obtenerNumTransaccionesPorTipo(
    transacciones,
    "crédito",
  );

  console.log("Reporte de Transacciones");
  console.log("---------------------------------------------");
  console.log(`Balance Final: ${balanceFinal}`);
  console.log(
    `Transacción de Mayor Monto: ID ${transaccionMayorMonto.id} - ${transaccionMayorMonto.monto.toFixed(2)}`,
  );
  console.log(
    `Conteo de Transacciones: Crédito: ${numTransaccionesCredito} - Débito: ${numTransaccionesDebito}`,
  );
});
