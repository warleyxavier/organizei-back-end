import { Inject, Service } from "typedi";

import { ECategoriaNaoEncontradaException } from "../../exception";
import IMovimentacao from "../../entities/IMovimentacao";
import ICategoriaRepository from "../../repositories/ICategoriaRepository";
import IMovimentacaoRepository from "../../repositories/IMovimentacaoRepository";
import IContaRepository from "../../repositories/IContaRepository";
import IGerenciadorMovimentacao from "../IGerenciadorMovimentacao";
import IProcessadorMovimentacao from "../IProcessadorMovimentacao";

@Service({id: "financeiro.gerenciadorMovimentacao", transient: true})
export default class GerenciadorMovimentacao implements IGerenciadorMovimentacao {

  @Inject("financeiro.contaRepository")
  private contaRepository: IContaRepository;

  @Inject("financeiro.categoriaRepository")
  private categoriaRepository: ICategoriaRepository;

  @Inject("financeiro.movimentacaoRepository")
  private movimentacaoRepository: IMovimentacaoRepository;

  @Inject("financeiro.processadorMovimentacao")
  private processadorMovimentacao: IProcessadorMovimentacao;

  public async pesquisarMovimentacoesContaPadrao(codigoUsuario: number): Promise<IMovimentacao[]> {
    const conta = await this.contaRepository.pesquisarContaPadrao(codigoUsuario);
    return await this.movimentacaoRepository.pesquisarPelaConta(conta.Codigo);
  }

  public async criarReceitaPadrao(movimentacao: IMovimentacao, codigoUsuario: number): Promise<IMovimentacao> {
    const conta = await this.contaRepository.pesquisarContaPadrao(codigoUsuario);
    const categoria = await this.categoriaRepository.pesquisarCategoriaDeReceitaPadrao(codigoUsuario);

    movimentacao.Categoria = categoria;
    movimentacao.Conta = conta;

    return await this.processadorMovimentacao.processar(movimentacao);
  }

  public async criarMovimentacaoNaContaPadrao(movimentacao: IMovimentacao, codigoCategoria: number, codigoUsuario: number): Promise<IMovimentacao> {
    const conta = await this.contaRepository.pesquisarContaPadrao(codigoUsuario);
    const categoria = await this.categoriaRepository.pesquisarPeloCodigo(codigoCategoria);

    if (!categoria)
      throw new ECategoriaNaoEncontradaException();

    movimentacao.Categoria = categoria;
    movimentacao.Conta = conta;

    return await this.processadorMovimentacao.processar(movimentacao);
  }

}