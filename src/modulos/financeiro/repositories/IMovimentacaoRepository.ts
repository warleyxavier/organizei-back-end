import IMovimentacao from "../entities/IMovimentacao";

export default interface IMovimentacaoRepository {
  pesquisarMaiorOrdem(codigoConta: number): Promise<number>;
  salvar(movimentacao: IMovimentacao): Promise<IMovimentacao>;
}