import IMovimentacaoObjetivo from "../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default interface IObjetivoFinanceiroRepository {
  salvar(objetivo: IObjetivoFinanceiro): Promise<IObjetivoFinanceiro>;
  pesquisarPeloUsuario(codigoUsuario: number): Promise<IObjetivoFinanceiro[]>;
  pesquisarPeloCodigo(codigo: number): Promise<IObjetivoFinanceiro>;
  
  salvarMovimentacao(movimentacao: IMovimentacaoObjetivo): Promise<IMovimentacaoObjetivo>;
  pesquisarMovimentacoes(codigoObjetivo: number): Promise<IMovimentacaoObjetivo[]>;
}