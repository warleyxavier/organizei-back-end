import { Inject, Service } from "typedi";

import IConexao from "../../../../core/config/IConexao";

import ICategoria from "../../entities/ICategoria";
import Categoria from "../../entities/impl/Categoria";
import ICategoriaRepository from "../ICategoriaRepository";

@Service({id: "financeiro.categoriaRepository", transient: true})
export default class CategoriaRepository implements ICategoriaRepository {

  @Inject("conexao")
  private conexao: IConexao;

  public pesquisarPeloCodigo(codigo: number): Promise<ICategoria> {
    return this.conexao.getGerenciador().findOne(Categoria, codigo);
  }

  public salvar(categoria: ICategoria): Promise<ICategoria> {
    return this.conexao.getGerenciador().save(Categoria, categoria);
  }

  public excluir(codigo: number): void {
    this.conexao.getGerenciador().delete(Categoria, codigo);
  }

}