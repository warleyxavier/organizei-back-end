import { Inject, Service } from "typedi";

import IConexao from "../../../../core/config/IConexao";

import ICategoria from "../../entities/ICategoria";
import Categoria from "../../entities/impl/Categoria";
import ICategoriaRepository from "../ICategoriaRepository";

@Service({id: "financeiro.categoriaRepository", transient: true})
export default class CategoriaRepository implements ICategoriaRepository {

  @Inject("conexao")
  private conexao: IConexao;

  public async salvar(categoria: ICategoria): Promise<ICategoria> {
    return await this.conexao.getGerenciador().save(Categoria, categoria);
  }

}