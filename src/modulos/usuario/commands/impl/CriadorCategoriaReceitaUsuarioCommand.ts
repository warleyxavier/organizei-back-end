import Container, { Inject, Service } from "typedi";

import { TipoCategoria } from "../../../financeiro/enums/TipoCategoria";
import ICategoria from "../../../financeiro/entities/ICategoria";
import ICategoriaRepository from "../../../financeiro/repositories/ICategoriaRepository";

import IUsuario from "../../entities/IUsuario";
import IAcaoPosRegistroUsuarioCommand from "../IAcaoPosRegistroUsuarioCommand";

@Service({id: "usuario.criadorCategoriaReceitaUsuarioCommand", transient: true})
export default class CriadorCategoriaReceitaUsuarioCommand implements IAcaoPosRegistroUsuarioCommand {
  
  @Inject("financeiro.categoriaRepository")
  private categoriaRepository: ICategoriaRepository;
  
  public executar(usuario: IUsuario): void {
    let categoria = Container.get<ICategoria>("categoria");
    categoria.Nome = 'Receita';
    categoria.Tipo = TipoCategoria.Receita;
    categoria.Usuario = usuario;
    categoria.EhPadrao = true;
    this.categoriaRepository.salvar(categoria);
  }
}