import { Inject, Service } from "typedi";

import { EContaComSaldoInsuficienteException, EObjetivoComSaldoInsuficienteException } from "../../exception";
import { TipoMovimentacaoObjetivo } from "../../enums/TipoMovimentacaoObjetivo";
import IConta from "../../entities/IConta";
import IMovimentacaoObjetivo from "../../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IMovimentacao from "../../entities/IMovimentacao";
import IMovimentacaoFactory from "../../factory/IMovimentacaoFactory";
import IContaRepository from "../../repositories/IContaRepository";
import IMovimentacaoRepository from "../../repositories/IMovimentacaoRepository";
import IObjetivoFinanceiroRepository from "../../repositories/IObjetivoFinanceiroRepository";

import IProcessadorMovimentacaoObjetivo from "../IProcessadorMovimentacaoObjetivo";

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
    return TipoMovimentacaoObjetivo.ehDeposito(movimentacao.Tipo) ? this.depositar(objetivo, movimentacao, conta) : this.resgatar(objetivo, movimentacao, conta);
  }

  private async depositar(objetivo: IObjetivoFinanceiro, movimentacao: IMovimentacaoObjetivo, conta: IConta): Promise<IMovimentacaoObjetivo> {
    if (!conta.permiteDebitoDeValor(movimentacao.Valor))
      throw new EContaComSaldoInsuficienteException();

    const movimentacaoConta = await this.movimentacaoContaFactory.gerar(objetivo, movimentacao, conta);

    objetivo.creditar(movimentacao.Valor);
    conta.debitar(movimentacao.Valor);

    return this.salvarDados(objetivo, movimentacao, conta, movimentacaoConta);
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