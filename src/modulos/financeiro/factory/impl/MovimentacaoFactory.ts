import IConta from "../../entities/IConta";
import IMovimentacao from "../../entities/IMovimentacao";
import IMovimentacaoObjetivo from "../../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IMovimentacaoFactory from "../IMovimentacaoFactory";

export default class MovimentacaoFactory implements IMovimentacaoFactory {
  gerar(objetivo: IObjetivoFinanceiro, movimentacaoObjetivo: IMovimentacaoObjetivo, conta: IConta): IMovimentacao {
    throw new Error("Method not implemented.");
  }

}