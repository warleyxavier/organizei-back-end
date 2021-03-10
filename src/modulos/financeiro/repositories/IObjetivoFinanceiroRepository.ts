import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default interface IObjetivoFinanceiroRepository {
  salvar(objetivo: IObjetivoFinanceiro): Promise<IObjetivoFinanceiro>;
}