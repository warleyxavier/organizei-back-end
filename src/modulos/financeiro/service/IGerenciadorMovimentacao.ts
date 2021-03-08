import IMovimentacao from "../entities/IMovimentacao";

export default interface IGerenciadorMovimentacao {
  pesquisarMovimentacoesContaPadrao(codigoUsuario: number): Promise<IMovimentacao[]>;
  criarMovimentacaoNaContaPadrao(movimentacao: IMovimentacao, codigoCategoria: number, codigoUsuario: number): Promise<IMovimentacao>;
  criarReceitaPadrao(movimentacao: IMovimentacao, codigoUsuario: number): Promise<IMovimentacao>;
}