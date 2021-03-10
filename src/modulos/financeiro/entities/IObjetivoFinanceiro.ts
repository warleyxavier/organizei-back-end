import IUsuario from "../../usuario/entities/IUsuario";

export default interface IObjetivoFinanceiro {
  Codigo: number;
  Descricao: string;
  ValorMeta: number;
  Saldo: number;
  Prazo: Date;
  Arquivado: boolean;

  Usuario: IUsuario;
}