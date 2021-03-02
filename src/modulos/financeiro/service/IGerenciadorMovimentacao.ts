import IMovimentacao from "../entities/IMovimentacao";

export default interface IGerenciadorMovimentacao {
  criarReceitaPadrao(movimentacao: IMovimentacao, codigoUsuario: number): Promise<IMovimentacao>;
}