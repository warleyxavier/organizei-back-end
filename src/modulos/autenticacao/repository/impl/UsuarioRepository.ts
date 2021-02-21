import { Inject, Service } from "typedi";
import { threadId } from "worker_threads";

import IConexao from "../../../../core/config/IConexao";

import Usuario from "../../../common/entity/impl/Usuario";
import IUsuario from "../../../common/entity/IUsuario";

import IUsuarioRepository from "../IUsuarioRepository";

@Service("autenticacao.usuarioRepository")
export default class UsuarioRepository implements IUsuarioRepository {

  @Inject("conexao")
  private conexao: IConexao;

  public async existeUsuarioComOEmail(email: string): Promise<boolean> {
    return await this.conexao.getGerenciador().count(Usuario, {where: {EMail: email}}) > 0;
  }

  public async pesquisarPorEmail(email: string): Promise<IUsuario> {
    return await this.conexao.getGerenciador().findOne(Usuario, {where: {EMail: email}});
  }

  public async inserir(usuario: IUsuario): Promise<void> {
    await this.conexao.getGerenciador().insert(Usuario, usuario);
  }

}