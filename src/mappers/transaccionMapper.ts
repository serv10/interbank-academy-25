import { Decimal } from "decimal.js";

import type {
  TipoTransaccion,
  Transaccion,
} from "../interfaces/transaccionInterface.ts";

export const transaccionMapper = (
  data: Record<string, string>,
): Transaccion => {
  return {
    id: Number(data.id),
    tipo: data.tipo.toLowerCase() as TipoTransaccion,
    monto: new Decimal(data.monto),
  };
};
