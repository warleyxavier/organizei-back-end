import { Inject, Service } from "typedi";

import IConexao from "../../../../core/config/IConexao";

import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import ObjetivoFinanceiro from "../../entities/impl/ObjetivoFinanceiro";
import IMovimentacaoObjetivo from "../../entities/IMovimentacaoObjetivo";
import MovimentacaoObjetivo from "../../entities/impl/MovimentacaoObjetivo";
import IObjetivoFinanceiroRepository from "../IObjetivoFinanceiroRepository";

@Service({id: "financeiro.objetivoFinanceiroRepository", transient: true})
export default class ObjetivoFinanceiroRepository implements IObjetivoFinanceiroRepository {
  
  @Inject("conexao")
  private conexao: IConexao;

  public salvar(objetivo: IObjetivoFinanceiro): Promise<IObjetivoFinanceiro> {
    return this.conexao.getGerenciador().save(ObjetivoFinanceiro, objetivo);
  }

  public pesquisar(codigoUsuario: number): Promise<IObjetivoFinanceiro[]> {
    return this.conexao.getGerenciador().find(ObjetivoFinanceiro, {where: {CodigoUsuario: codigoUsuario}, order: {Codigo: "ASC"}});
  }

  public salvarMovimentacao(movimentacao: IMovimentacaoObjetivo): Promise<IMovimentacaoObjetivo> {
    return this.conexao.getGerenciador().save(MovimentacaoObjetivo, movimentacao);
  }

}