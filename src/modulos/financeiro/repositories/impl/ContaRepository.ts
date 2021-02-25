import { Inject, Service } from "typedi";

import IConexao from "../../../../core/config/IConexao";

import IConta from "../../entities/IConta";
import Conta from "../../entities/impl/Conta";
import IContaRepository from "../IContaRepository";

@Service({id: "financeiro.contaRepository", transient: true})
export default class ContaRepository implements IContaRepository {

  @Inject("conexao")
  private conexao: IConexao;

  public async inserir(conta: IConta): Promise<void> {
    await this.conexao.getGerenciador().insert(Conta, conta);
  }

}