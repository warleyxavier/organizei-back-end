import { Inject, Service } from "typedi";

import EObjetivoComSaldoInsuficienteException from "../../exception/ObjetivoComSaldoInsuficienteException";
import { TipoMovimentacaoObjetivo } from "../../enums/TipoMovimentacaoObjetivo";
import IConta from "../../entities/IConta";
import IMovimentacaoObjetivo from "../../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IContaRepository from "../../repositories/IContaRepository";

import IProcessadorMovimentacaoObjetivo from "../IProcessadorMovimentacaoObjetivo";
import IObjetivoFinanceiroRepository from "modulos/financeiro/repositories/IObjetivoFinanceiroRepository";
import IMovimentacaoFactory from "modulos/financeiro/factory/IMovimentacaoFactory";
import IMovimentacaoRepository from "modulos/financeiro/repositories/IMovimentacaoRepository";
import IMovimentacao from "modulos/financeiro/entities/IMovimentacao";

@Service({id: "financeiro.processadorMovimentacaoObjetivo", transient: true})
export default class ProcessadorMovimentacaoObjetivo implements IProcessadorMovimentacaoObjetivo {
  
  @Inject("financeiro.contaRepository")
  private contaRepository: IContaRepository;

  @Inject("financeiro.objetivoFinanceiroRepository")
  private objetivoRepository: IObjetivoFinanceiroRepository;

  @Inject("financeiro.movimentacaoRepository")
  private movimentacaoContaRepository: IMovimentacaoRepository;

  @Inject("financeiro.movimentacaoFactory")
  private movimentacaoContaFactory: IMovimentacaoFactory;

  public async processar(objetivo: IObjetivoFinanceiro, movimentacao: IMovimentacaoObjetivo): Promise<IMovimentacaoObjetivo> {
    let conta = await this.contaRepository.pesquisarContaPadrao(objetivo.CodigoUsuario);
    movimentacao.CodigoObjetivo = objetivo.Codigo;
    movimentacao.Conta = conta;
    return this.resgatar(objetivo, movimentacao, conta);
  }

  private async resgatar(objetivo: IObjetivoFinanceiro, movimentacao: IMovimentacaoObjetivo, conta: IConta): Promise<IMovimentacaoObjetivo> {
    if (!objetivo.permiteResgateDeValor(movimentacao.Valor))
      throw new EObjetivoComSaldoInsuficienteException();

    const movimentacaoConta = await this.movimentacaoContaFactory.gerar(objetivo, movimentacao, conta);

    objetivo.debitar(movimentacao.Valor);
    conta.creditar(movimentacao.Valor);

    return this.salvarDados(objetivo, movimentacao, conta, movimentacaoConta);
  }

  private async salvarDados(objetivo: IObjetivoFinanceiro, movimentacao: IMovimentacaoObjetivo, conta: IConta, movimentacaoConta: IMovimentacao): Promise<IMovimentacaoObjetivo> {
    await this.movimentacaoContaRepository.salvar(movimentacaoConta);
    await this.objetivoRepository.salvar(objetivo);
    await this.contaRepository.salvar(conta);
    return this.objetivoRepository.salvarMovimentacao(movimentacao);
  }

}