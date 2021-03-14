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

  arquivar(): void;
  pertenceAoUsuario(codigoUsuario: number): boolean;
  permiteResgateDeValor(valor: number): boolean;
  debitar(valor: number): void;
  creditar(valor: number): void;
}