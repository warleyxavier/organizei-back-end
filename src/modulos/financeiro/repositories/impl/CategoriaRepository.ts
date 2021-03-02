import { Inject, Service } from "typedi";

import IConexao from "../../../../core/config/IConexao";

import { TipoCategoria } from "../../enums/TipoCategoria";
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
  
  public pesquisarTodasCategorias(codigoUsuario: number): Promise<ICategoria[]> {
    return this.conexao.getGerenciador()
    .createQueryBuilder(Categoria, "categorias")
    .where("categorias.usuario_id = :codigoUsuario", {codigoUsuario})
    .orderBy("id")
    .getMany();
  }
  
  public pesquisarCategoriasDeDespesa(codigoUsuario: number): Promise<ICategoria[]> {
    return this.conexao.getGerenciador()
    .createQueryBuilder(Categoria, "categorias")
    .where("categorias.usuario_id = :codigoUsuario and categorias.tipo = :tipoCategoria", {codigoUsuario, tipoCategoria: TipoCategoria.Despesa})
    .orderBy("id")
    .getMany();
  }
  
  public pesquisarCategoriaDeDespesaPadrao(codigoUsuario: number): Promise<ICategoria> {
    return this.conexao.getGerenciador()
    .createQueryBuilder(Categoria, "categorias")
    .where("categorias.usuario_id = :codigoUsuario and categorias.eh_padrao = true and categorias.tipo = :tipoCategoria", {codigoUsuario, tipoCategoria: TipoCategoria.Despesa})
    .orderBy("id")
    .getOne();
  }
  
  public salvar(categoria: ICategoria): Promise<ICategoria> {
    return this.conexao.getGerenciador().save(Categoria, categoria);
  }

  public excluir(codigo: number): void {
    this.conexao.getGerenciador().delete(Categoria, codigo);
  }

}