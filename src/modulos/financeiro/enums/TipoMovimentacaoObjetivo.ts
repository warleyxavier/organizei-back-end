export enum TipoMovimentacaoObjetivo {
  Deposito,
  Resgate
}

export namespace TipoMovimentacaoObjetivo {
  export function ehDeposito(tipo: number|TipoMovimentacaoObjetivo): boolean {
    if (typeof tipo == "number")
      return tipo == 0;

    return tipo == TipoMovimentacaoObjetivo.Deposito;
  }
}