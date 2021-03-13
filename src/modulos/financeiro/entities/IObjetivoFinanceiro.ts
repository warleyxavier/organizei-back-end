import IUsuario from "../../usuario/entities/IUsuario";
import ICategoria from "./ICategoria";

export default interface IObjetivoFinanceiro {
  Codigo: number;
  Descricao: string;
  ValorMeta: number;
  Saldo: number;
  Prazo: Date;
  Arquivado: boolean;

  CodigoUsuario: number;

  Usuario: IUsuario;
  CategoriaDeposito: ICategoria;
  CategoriaResgate: ICategoria;

  pertenceAoUsuario(codigoUsuario: number): boolean;
}