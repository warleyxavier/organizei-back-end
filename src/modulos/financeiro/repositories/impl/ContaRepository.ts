import { Inject, Service } from "typedi";

import IConexao from "../../../../core/config/IConexao";

import IConta from "../../entities/IConta";
import Conta from "../../entities/impl/Conta";
import IContaRepository from "../IContaRepository";

@Service({id: "financeiro.contaRepository", transient: true})
export default class ContaRepository implements IContaRepository {
  
  @Inject("conexao")
  private conexao: IConexao;
  
  public pesquisarContaPadrao(codigoUsuario: number): Promise<IConta> {
    return this.conexao.getGerenciador()
    .createQueryBuilder(Conta, "contas")
    .where("contas.usuario_id = :codigoUsuario and contas.eh_padrao = true", {codigoUsuario})
    .getOne();
  }
  
  public async inserir(conta: IConta): Promise<void> {
    await this.conexao.getGerenciador().insert(Conta, conta);
  }
  
  public salvar(conta: IConta): Promise<IConta> {
    return this.conexao.getGerenciador().save(Conta, conta);
  }
}