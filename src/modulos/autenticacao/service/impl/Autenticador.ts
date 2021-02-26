import { Inject, Service } from "typedi";

import AccessToken from "../../dto/AccessToken";
import { ESenhaIncorretaUsuario, EUsuarioNaoEncontradoException } from "../../exception";
import IUsuarioRepository from "../../../usuario/repository/IUsuarioRepository";

import IAutenticador from "../IAutenticador";
import IGeradorAccessToken from "../IGeradorAccessToken";

@Service({id: "autenticacao.autenticador", transient: true})
export default class Autenticador implements IAutenticador {

  @Inject("usuario.usuarioRepository")
  private usuarioRepository: IUsuarioRepository;

  @Inject("autenticacao.geradorJWTAccessToken")
  private geradorAccessToken: IGeradorAccessToken;

  public async autenticar(email: string, senha: string): Promise<AccessToken> {
    const usuario = await this.usuarioRepository.pesquisarPorEmail(email);

    if (!usuario)
      throw new EUsuarioNaoEncontradoException(email);

    if (!usuario.possuiASenha(senha))
      throw new ESenhaIncorretaUsuario();

    const accessToken: string = this.geradorAccessToken.gerar(usuario.Codigo);

    return new AccessToken(accessToken);
  }

}