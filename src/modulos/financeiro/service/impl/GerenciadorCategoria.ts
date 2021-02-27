
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

  public async criar(categoria: ICategoria, codigoUsuario: number): Promise<ICategoria> {
    const usuario = await this.usuarioRepository.pesquisarPorCodigo(codigoUsuario);
    categoria.Usuario = usuario;
    return await this.categoriaRepository.salvar(categoria);
  }

  public async excluir(codigoCategoria: number, codigoUsuario: number): Promise<void> {
    const categoria = await this.categoriaRepository.pesquisarPeloCodigo(codigoCategoria);

    if (!categoria)
      throw new ECategoriaNaoEncontradaException();

    if (!categoria.pertenceAoUsuario(codigoUsuario))
      throw new ECategoriaNaoPertenceAoUsuarioException();

    await this.categoriaRepository.excluir(categoria.Codigo);
  }

}