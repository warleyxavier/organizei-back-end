import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default interface ICriadorObjetivoFinanceiro {
  criar(objetivo: IObjetivoFinanceiro, codigoUsuario: number): Promise<IObjetivoFinanceiro>;
}