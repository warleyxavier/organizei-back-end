import { Inject, Service } from "typedi";

import { EObjetivoNaoEncontradoException, EObjetivoNaoPertenceAoUsuarioException, EObjetivoArquivadoException } from "../../exception";
import IMovimentacaoObjetivo from "../../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IObjetivoFinanceiroRepository from "../../repositories/IObjetivoFinanceiroRepository";
import ICriadorObjetivoFinanceiro from "../ICriadorObjetivoFinanceiro";
import IGerenciadorObjetivoFinanceiro from "../IGerenciadorObjetivoFinanceiro";

@Service({ id: "financeiro.gerenciadorObjetivoFinanceiro", transient: true })
export default class GerenciadorObjetivoFinanceiro implements IGerenciadorObjetivoFinanceiro {

  @Inject("financeiro.objetivoFinanceiroRepository")
  private objetivoRepository: IObjetivoFinanceiroRepository;

  @Inject("financeiro.criadorObjetivoFinanceiro")
  private criadorObjetivo: ICriadorObjetivoFinanceiro;

  public async criar(objetivo: IObjetivoFinanceiro, codigoUsuario: number): Promise<IObjetivoFinanceiro> {
    return this.criadorObjetivo.criar(objetivo, codigoUsuario);
  }

  public async atualizar(objetivo: IObjetivoFinanceiro, codigoObjetivo: number, codigoUsuario: number): Promise<IObjetivoFinanceiro> {
    let objetivoPesquisado = await this.objetivoRepository.pesquisarPeloCodigo(codigoObjetivo);
    this.validarObjetivo(objetivoPesquisado, codigoUsuario);
    objetivoPesquisado = {...objetivoPesquisado, ...objetivo};
    return this.objetivoRepository.salvar(objetivoPesquisado);
  }

  public async arquivar(codigoObjetivo: number, codigoUsuario: number): Promise<void> {
    let objetivoPesquisado = await this.objetivoRepository.pesquisarPeloCodigo(codigoObjetivo);
    this.validarObjetivo(objetivoPesquisado, codigoUsuario);
    objetivoPesquisado.arquivar();
    this.objetivoRepository.salvar(objetivoPesquisado);
  }

  private validarObjetivo(objetivo: IObjetivoFinanceiro, codigoUsuario: number): void {
    if (!objetivo)
      throw new EObjetivoNaoEncontradoException();

    if (!objetivo.pertenceAoUsuario(codigoUsuario))
      throw new EObjetivoNaoPertenceAoUsuarioException();

    if (objetivo.Arquivado)
      throw new EObjetivoArquivadoException();
  }

  public pesquisar(codigoUsuario: number): Promise<IObjetivoFinanceiro[]> {
    return this.objetivoRepository.pesquisarPeloUsuario(codigoUsuario);
  }

  public async pesquisarMovimentacoes(codigoObjetivo: number, codigoUsuario: number): Promise<IMovimentacaoObjetivo[]> {
    const objetivo = await this.objetivoRepository.pesquisarPeloCodigo(codigoObjetivo);
    this.validarObjetivo(objetivo, codigoUsuario);
    return this.objetivoRepository.pesquisarMovimentacoes(objetivo.Codigo);
  }

  public async lancarMovimentacao(movimentacaoObjetivo: IMovimentacaoObjetivo, codigoObjetivo: number, codigoUsuario: number): Promise<IMovimentacaoObjetivo> {
    const objetivo = await this.objetivoRepository.pesquisarPeloCodigo(codigoObjetivo);
    this.validarObjetivo(objetivo, codigoUsuario);
  }

}