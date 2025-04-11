import type { Decimal } from "decimal.js";

export type TipoTransaccion = "débito" | "crédito";

export interface Transaccion {
  id: number;
  tipo: TipoTransaccion;
  monto: Decimal; // Usar Decimal para manejar montos con precisión
}
