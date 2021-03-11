import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default interface IObjetivoFinanceiroRepository {
  salvar(objetivo: IObjetivoFinanceiro): Promise<IObjetivoFinanceiro>;
  pesquisar(codigoUsuario: number): Promise<IObjetivoFinanceiro[]>;
}