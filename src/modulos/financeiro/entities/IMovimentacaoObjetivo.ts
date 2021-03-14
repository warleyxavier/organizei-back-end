import { TipoMovimentacaoObjetivo } from "../enums/TipoMovimentacaoObjetivo";
import ICategoria from "./ICategoria";
import IConta from "./IConta";

export default interface IMovimentacaoObjetivo {
  Codigo: number;
  Tipo: TipoMovimentacaoObjetivo;
  Valor: number;
  Data: Date;

  CodigoObjetivo: number;

  Conta: IConta;

}