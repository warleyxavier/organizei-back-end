import ICategoria from "./ICategoria";
import IConta from "./IConta";

export default interface IMovimentacao {
  Codigo: number;
  Descricao: string;
  Valor: number;
  Data: Date;
  Ordem: number;

  Categoria: ICategoria;
  Conta: IConta;
}