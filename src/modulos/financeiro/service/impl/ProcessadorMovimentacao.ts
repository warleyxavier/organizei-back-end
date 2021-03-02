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
    conta.debitar(movimentacao.Valor);

    const movimentacaoInserida = await this.movimentacaoRepository.salvar(movimentacao);
    await this.contaRepository.salvar(conta);

    return movimentacaoInserida;
  }

}