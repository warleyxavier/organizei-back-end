import { Inject, Service } from "typedi";

import IConexao from "../../../../core/config/IConexao";

import Usuario from "../../entities/impl/Usuario";
import IUsuario from "../../entities/IUsuario";

import IUsuarioRepository from "../IUsuarioRepository";

@Service({id: "usuario.usuarioRepository", transient: true})
export default class UsuarioRepository implements IUsuarioRepository {

  @Inject("conexao")
  private conexao: IConexao;

  public async existeUsuarioComOEmail(email: string): Promise<boolean> {
    return await this.conexao.getGerenciador().count(Usuario, {where: {EMail: email}}) > 0;
  }

  public async pesquisarPorCodigo(codigo: number): Promise<IUsuario> {
    return await this.conexao.getGerenciador().findOne(Usuario, codigo);
  }

  public async pesquisarPorEmail(email: string): Promise<IUsuario> {
    return await this.conexao.getGerenciador().findOne(Usuario, {where: {EMail: email}});
  }

  public async inserir(usuario: IUsuario): Promise<IUsuario> {
    return await this.conexao.getGerenciador().save(Usuario, usuario, {});
  }

}