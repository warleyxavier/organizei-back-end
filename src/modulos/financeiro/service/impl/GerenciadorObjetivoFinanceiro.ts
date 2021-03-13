import { Inject, Service } from "typedi";

import { EObjetivoNaoEncontradoException, EObjetivoNaoPertenceAoUsuarioException } from "../../exception";
import IMovimentacaoObjetivo from "../../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IObjetivoFinanceiroRepository from "../../repositories/IObjetivoFinanceiroRepository";
import ICriadorObjetivoFinanceiro from "../ICriadorObjetivoFinanceiro";
import IGerenciadorObjetivoFinanceiro from "../IGerenciadorObjetivoFinanceiro";

@Service({id: "financeiro.gerenciadorObjetivoFinanceiro", transient: true})
export default class GerenciadorObjetivoFinanceiro implements IGerenciadorObjetivoFinanceiro {
  
  @Inject("financeiro.objetivoFinanceiroRepository")
  private objetivoRepository: IObjetivoFinanceiroRepository;

  @Inject("financeiro.criadorObjetivoFinanceiro")
  private criadorObjetivo: ICriadorObjetivoFinanceiro;

  public async criar(objetivo: IObjetivoFinanceiro, codigoUsuario: number): Promise<IObjetivoFinanceiro> {
    return this.criadorObjetivo.criar(objetivo, codigoUsuario);
  }

  public pesquisar(codigoUsuario: number): Promise<IObjetivoFinanceiro[]> {
    return this.objetivoRepository.pesquisarPeloUsuario(codigoUsuario);
  }

  public async pesquisarMovimentacoes(codigoObjetivo: number, codigoUsuario: number): Promise<IMovimentacaoObjetivo[]> {
    const objetivo = await this.objetivoRepository.pesquisarPeloCodigo(codigoObjetivo);

    if (!objetivo)
      throw new EObjetivoNaoEncontradoException();

    if (!objetivo.pertenceAoUsuario(codigoUsuario))
      throw new EObjetivoNaoPertenceAoUsuarioException();

    return this.objetivoRepository.pesquisarMovimentacoes(objetivo.Codigo);
  }

}