import IMovimentacao from "../entities/IMovimentacao";

export default interface IMovimentacaoRepository {
  pesquisarPelaConta(codigoConta: number): Promise<IMovimentacao[]>;
  pesquisarMaiorOrdem(codigoConta: number): Promise<number>;
  salvar(movimentacao: IMovimentacao): Promise<IMovimentacao>;
}