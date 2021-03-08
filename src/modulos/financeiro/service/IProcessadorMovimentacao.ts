import IMovimentacao from "../entities/IMovimentacao";

export default interface IProcessadorMovimentacao {
  processar(movimentacao: IMovimentacao): Promise<IMovimentacao>;
  excluir(movimentacao: IMovimentacao): Promise<void>;
}