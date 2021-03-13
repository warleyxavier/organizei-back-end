import { Inject, Service } from "typedi";

import EObjetivoComSaldoInsuficienteException from "../../exception/ObjetivoComSaldoInsuficienteException";
import { TipoMovimentacaoObjetivo } from "../../enums/TipoMovimentacaoObjetivo";
import IConta from "../../entities/IConta";
import IMovimentacaoObjetivo from "../../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IContaRepository from "../../repositories/IContaRepository";

import IProcessadorMovimentacaoObjetivo from "../IProcessadorMovimentacaoObjetivo";
import IObjetivoFinanceiroRepository from "modulos/financeiro/repositories/IObjetivoFinanceiroRepository";

@Service({id: "financeiro.processadorMovimentacaoObjetivo", transient: true})
export default class ProcessadorMovimentacaoObjetivo implements IProcessadorMovimentacaoObjetivo {
  
  @Inject("financeiro.contaRepository")
  private contaRepository: IContaRepository;

  @Inject("financeiro.objetivoFinanceiroRepository")
  private objetivoRepository: IObjetivoFinanceiroRepository;

  public async processar(objetivo: IObjetivoFinanceiro, movimentacao: IMovimentacaoObjetivo): Promise<IMovimentacaoObjetivo> {
    let conta = await this.contaRepository.pesquisarContaPadrao(objetivo.CodigoUsuario);

    if (movimentacao.Tipo == TipoMovimentacaoObjetivo.Resgate)
      return this.resgatar(objetivo, movimentacao, conta);
  }

  private async resgatar(objetivo: IObjetivoFinanceiro, movimentacao: IMovimentacaoObjetivo, conta: IConta): Promise<IMovimentacaoObjetivo> {
    if (!objetivo.permiteResgateDeValor(movimentacao.Valor))
      throw new EObjetivoComSaldoInsuficienteException();

    objetivo.debitar(movimentacao.Valor);
    conta.creditar(movimentacao.Valor);

    await this.contaRepository.salvar(conta);
    await this.objetivoRepository.salvar(objetivo);
    return this.objetivoRepository.salvarMovimentacao(movimentacao);
  }

}