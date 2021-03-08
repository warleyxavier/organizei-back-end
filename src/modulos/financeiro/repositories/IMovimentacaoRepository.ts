import IMovimentacao from "../entities/IMovimentacao";

export default interface IMovimentacaoRepository {
  pesquisarPeloCodigo(codigo: number): Promise<IMovimentacao>;
  pesquisarPelaConta(codigoConta: number): Promise<IMovimentacao[]>;
  pesquisarMaiorOrdem(codigoConta: number): Promise<number>;
  salvar(movimentacao: IMovimentacao): Promise<IMovimentacao>;
  excluir(codigo: number): void;
}