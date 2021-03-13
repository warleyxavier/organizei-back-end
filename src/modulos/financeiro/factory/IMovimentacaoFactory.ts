import IConta from "../entities/IConta";
import IMovimentacao from "../entities/IMovimentacao";
import IMovimentacaoObjetivo from "../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default interface IMovimentacaoFactory {
  gerar(objetivo: IObjetivoFinanceiro, movimentacaoObjetivo: IMovimentacaoObjetivo, conta: IConta): IMovimentacao;
}