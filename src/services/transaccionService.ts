import { Decimal } from "decimal.js";

import type {
  TipoTransaccion,
  Transaccion,
} from "../interfaces/transaccionInterface.ts";

// Obtener todas las transacciones de un tipo específico
export const obtenerTransaccionesPorTipo = (
  transacciones: Transaccion[],
  tipo: TipoTransaccion,
): Transaccion[] => {
  return transacciones.filter((transaccion) => transaccion.tipo === tipo);
};

// Calcular el balance final de las transacciones
export const calcularBalanceFinal = (transacciones: Transaccion[]): Decimal => {
  const balanceTotalDebito = calcularMontoTotalPorTipo(transacciones, "débito");
  const balanceTotalCredito = calcularMontoTotalPorTipo(
    transacciones,
    "crédito",
  );

  return balanceTotalCredito.minus(balanceTotalDebito);
};

// Calcular el monto total por tipo de transacción
export const calcularMontoTotalPorTipo = (
  transacciones: Transaccion[],
  tipo: TipoTransaccion,
): Decimal => {
  const transaccionesPorTipo = obtenerTransaccionesPorTipo(transacciones, tipo);

  return transaccionesPorTipo.reduce(
    (acc, transaccion) => acc.plus(transaccion.monto),
    new Decimal(0),
  );
};

// Obtener la transacción con el monto más alto
export const obtenerTransaccionConMayorMonto = (
  transacciones: Transaccion[],
): Transaccion => {
  return transacciones.reduce((max, actual) =>
    max.monto.gt(actual.monto) ? max : actual,
  );
};

// Contar el número de transacciones de un tipo específico
export const obtenerNumTransaccionesPorTipo = (
  transacciones: Transaccion[],
  tipo: TipoTransaccion,
): number => {
  const transaccionesPorTipo = obtenerTransaccionesPorTipo(transacciones, tipo);
  return transaccionesPorTipo.length;
};
