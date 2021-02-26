
import { Inject, Service } from "typedi";

import IUsuarioRepository from "../../../usuario/repository/IUsuarioRepository";

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

}