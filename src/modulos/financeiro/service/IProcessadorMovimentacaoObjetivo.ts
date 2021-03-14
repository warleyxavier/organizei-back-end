import IMovimentacaoObjetivo from "../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default interface IProcessadorMovimentacaoObjetivo {
  processar(objetivo: IObjetivoFinanceiro, movimentacao: IMovimentacaoObjetivo): Promise<IMovimentacaoObjetivo>;
}