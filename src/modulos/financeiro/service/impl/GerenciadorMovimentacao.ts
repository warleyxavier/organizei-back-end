import { Inject, Service } from "typedi";

import IMovimentacao from "../../entities/IMovimentacao";
import ICategoriaRepository from "../../repositories/ICategoriaRepository";
import IContaRepository from "../../repositories/IContaRepository";
import IGerenciadorMovimentacao from "../IGerenciadorMovimentacao";

@Service({id: "financeiro.gerenciadorMovimentacao", transient: true})
export default class GerenciadorMovimentacao implements IGerenciadorMovimentacao {

  @Inject("financeiro.contaRepository")
  private contaRepository: IContaRepository;

  @Inject("financeiro.categoriaRepository")
  private categoriaRepository: ICategoriaRepository;

  public async criarReceitaPadrao(movimentacao: IMovimentacao, codigoUsuario: number): Promise<IMovimentacao> {
    const conta = await this.contaRepository.pesquisarContaPadrao(codigoUsuario);
    const categoria = await this.categoriaRepository.pesquisarCategoriaDeDespesaPadrao(codigoUsuario);

    movimentacao.Categoria = categoria;
    movimentacao.Conta = conta;

    return movimentacao;
  }

}