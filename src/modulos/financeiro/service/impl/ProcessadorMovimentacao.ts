import { Inject, Service } from "typedi";

import IMovimentacao from "../../entities/IMovimentacao";
import IContaRepository from "../../repositories/IContaRepository";
import IMovimentacaoRepository from "../../repositories/IMovimentacaoRepository";
import IProcessadorMovimentacao from "../IProcessadorMovimentacao";

@Service({id: "financeiro.processadorMovimentacao", transient: true})
export default class ProcessadorMovimentacao implements IProcessadorMovimentacao {

  @Inject("financeiro.contaRepository")
  private contaRepository: IContaRepository;

  @Inject("financeiro.movimentacaoRepository")
  private movimentacaoRepository: IMovimentacaoRepository;

  public async processar(movimentacao: IMovimentacao): Promise<IMovimentacao> {
    let conta = movimentacao.Conta;
    movimentacao.Categoria.ehDespesa() ? conta.debitar(movimentacao.Valor) : conta.creditar(movimentacao.Valor);

    const maiorOrdem: any = await this.movimentacaoRepository.pesquisarMaiorOrdem(conta.Codigo);
    movimentacao.Ordem = maiorOrdem + 1;

    const movimentacaoInserida = await this.movimentacaoRepository.salvar(movimentacao);
    await this.contaRepository.salvar(conta);

    return movimentacaoInserida;
  }

  public async excluir(movimentacao: IMovimentacao): Promise<void> {
    let conta = movimentacao.Conta;
    movimentacao.Categoria.ehDespesa() ? conta.creditar(movimentacao.Valor) : conta.debitar(movimentacao.Valor);
    await this.movimentacaoRepository.excluir(movimentacao.Codigo);
    this.contaRepository.salvar(conta);
  }

}