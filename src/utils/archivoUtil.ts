import csv from "csv-parser";
import fs from "fs";

import type { Transaccion } from "../interfaces/transaccionInterface.ts";
import { transaccionMapper } from "../mappers/transaccionMapper.ts";

// Leer el archivo CSV y procesarlo
export const leerArchivoCSV = (
  rutaArchivoCSV: string,
  callback: (transacciones: Transaccion[]) => void,
) => {
  const transacciones: Transaccion[] = [];

  fs.createReadStream(rutaArchivoCSV)
    .pipe(csv()) // Usar la libreria csv-parser para leer el CSV
    .on("data", (data: Record<string, string>) => {
      const dataMappeada: Transaccion = transaccionMapper(data);

      if (dataMappeada) {
        return transacciones.push(dataMappeada); // La data obtenida se mapea a la interfaz Transaccion y se agrega al array
      }
    })
    .on("end", () => {
      callback(transacciones); // Llamar al callback con las transacciones procesadas
    })
    .on("error", (error) => {
      console.error("Error al procesar el archivo CSV:", error.message);
    });
};
