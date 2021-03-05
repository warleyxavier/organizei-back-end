import { Inject, Service } from "typedi";

import IConexao from "../../../../core/config/IConexao";

import IMovimentacao from "../../entities/IMovimentacao";
import Movimentacao from "../../entities/impl/Movimentacao";
import IMovimentacaoRepository from "../IMovimentacaoRepository";

@Service({id: "financeiro.movimentacaoRepository", transient: true})
export default class MovimentacaoRepository implements IMovimentacaoRepository {
  
  @Inject("conexao")
  private conexao: IConexao;

  public pesquisarPelaConta(codigoConta: number): Promise<IMovimentacao[]> {
    return this.conexao.getGerenciador().find(Movimentacao, {where: {CodigoConta: codigoConta}, order: {Ordem: "ASC"}});
  }

  public async  pesquisarMaiorOrdem(codigoConta: number): Promise<number> {
    const { maior_ordem } = await this.conexao.getGerenciador()
    .createQueryBuilder(Movimentacao, "movimentacoes")
    .select("coalesce(max(movimentacoes.ordem), 0)", "maior_ordem")
    .where("movimentacoes.conta_id = :codigoConta", {codigoConta})
    .getRawOne();
    return maior_ordem;
  }

  public salvar(movimentacao: IMovimentacao): Promise<IMovimentacao> {
    return this.conexao.getGerenciador().save(Movimentacao, movimentacao);
  }

}