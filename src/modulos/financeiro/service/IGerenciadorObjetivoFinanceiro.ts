import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default interface IGerenciadorObjetivoFinanceiro {
  criar(objetivo: IObjetivoFinanceiro, codigoUsuario: number): Promise<IObjetivoFinanceiro>;
}