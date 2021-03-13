import IMovimentacaoObjetivo from "../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default interface IGerenciadorObjetivoFinanceiro {
  criar(objetivo: IObjetivoFinanceiro, codigoUsuario: number): Promise<IObjetivoFinanceiro>;
  atualizar(objetivo: IObjetivoFinanceiro, codigoObjetivo: number, codigoUsuario: number): Promise<IObjetivoFinanceiro>;
  pesquisar(codigoUsuario: number): Promise<IObjetivoFinanceiro[]>;
  pesquisarMovimentacoes(codigoObjetivo: number, codigoUsuario: number): Promise<IMovimentacaoObjetivo[]>;
}