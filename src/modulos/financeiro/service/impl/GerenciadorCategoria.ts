
import { Inject, Service } from "typedi";

import IUsuarioRepository from "../../../usuario/repository/IUsuarioRepository";

import { ECategoriaNaoEncontradaException, ECategoriaNaoPertenceAoUsuarioException } from "../../exception";
import ICategoria from "../../../financeiro/entities/ICategoria";
import ICategoriaRepository from "../../../financeiro/repositories/ICategoriaRepository";
import IGerenciadorCategoria from "../IGerenciadorCategoria";

@Service("financeiro.gerenciadorCategoria")
export default class GerenciadorCategoria implements IGerenciadorCategoria {

  @Inject("usuario.usuarioRepository")
  private usuarioRepository: IUsuarioRepository;

  @Inject("financeiro.categoriaRepository")
  private categoriaRepository: ICategoriaRepository;

  public pesquisarTodasCategorias(codigoUsuario: number): Promise<ICategoria[]> {
    return this.categoriaRepository.pesquisarTodasCategorias(codigoUsuario);
  }

  public pesquisarCategoriasDeDespesa(codigoUsuario: number): Promise<ICategoria[]> {
    return this.categoriaRepository.pesquisarCategoriasDeDespesa(codigoUsuario);
  }

  public async pesquisarPeloCodigo(codigoUsuario: number, codigoCategoria: number): Promise<ICategoria> {
    var categoria = await this.categoriaRepository.pesquisarPeloCodigo(codigoCategoria);
    this.validarDadosDaCategoria(categoria, codigoUsuario);
    return categoria;
  }

  public async criar(categoria: ICategoria, codigoUsuario: number): Promise<ICategoria> {
    const usuario = await this.usuarioRepository.pesquisarPorCodigo(codigoUsuario);
    categoria.Usuario = usuario;
    return await this.categoriaRepository.salvar(categoria);
  }

  public async atualizar(categoria: ICategoria, codigoCategoria: number, codigoUsuario: number): Promise<ICategoria> {
    let categoriaPesquisada = await this.categoriaRepository.pesquisarPeloCodigo(codigoCategoria);
    this.validarDadosDaCategoria(categoriaPesquisada, codigoUsuario);
    categoriaPesquisada = {...categoriaPesquisada, ...categoria};
    return this.categoriaRepository.salvar(categoriaPesquisada);
  }

  public async excluir(codigoCategoria: number, codigoUsuario: number): Promise<void> {
    const categoria = await this.categoriaRepository.pesquisarPeloCodigo(codigoCategoria);
    this.validarDadosDaCategoria(categoria, codigoUsuario);
    await this.categoriaRepository.excluir(categoria.Codigo);
  }

  private validarDadosDaCategoria(categoria: ICategoria, codigoUsuario: number): void {
    if (!categoria)
      throw new ECategoriaNaoEncontradaException();

    if (!categoria.pertenceAoUsuario(codigoUsuario))
      throw new ECategoriaNaoPertenceAoUsuarioException();
  }

}