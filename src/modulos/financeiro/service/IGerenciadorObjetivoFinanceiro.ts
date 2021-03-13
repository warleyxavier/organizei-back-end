import IMovimentacaoObjetivo from "../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default interface IGerenciadorObjetivoFinanceiro {
  criar(objetivo: IObjetivoFinanceiro, codigoUsuario: number): Promise<IObjetivoFinanceiro>;
  atualizar(objetivo: IObjetivoFinanceiro, codigoObjetivo: number, codigoUsuario: number): Promise<IObjetivoFinanceiro>;
  arquivar(codigoObjetivo: number, codigoUsuario: number): Promise<void>;
  pesquisar(codigoUsuario: number): Promise<IObjetivoFinanceiro[]>;
  lancarMovimentacao(movimentacaoObjetivo: IMovimentacaoObjetivo, codigoObjetivo: number, codigoUsuario: number): Promise<IMovimentacaoObjetivo>;
  pesquisarMovimentacoes(codigoObjetivo: number, codigoUsuario: number): Promise<IMovimentacaoObjetivo[]>;
}