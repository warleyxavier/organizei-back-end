import { Inject, Service } from "typedi";

import IUsuario from "../../../common/entity/IUsuario";

import IUsuarioRepository from "../../repository/IUsuarioRepository";
import { EUsuarioJaRegistradoException } from "../../exception";
import IRegistradorDeUsuario from "../IRegistradorDeUsuario";

@Service("autenticacao.registradorUsuario")
export default class RegistradorDeUsuario implements IRegistradorDeUsuario{
  
  @Inject("autenticacao.usuarioRepository")
  private usuarioRepository: IUsuarioRepository;
  
  public async registrar(usuario: IUsuario): Promise<void> {    
    await this.validarSeUsuarioJaEstaRegistrado(usuario.EMail);
    this.usuarioRepository.inserir(usuario);  
  }

  private async validarSeUsuarioJaEstaRegistrado(email: string): Promise<void> {
    const usuarioJaEstaRegistrado: boolean = await this.usuarioRepository.existeUsuarioComOEmail(email);

    if (!usuarioJaEstaRegistrado)
      return;

    throw new EUsuarioJaRegistradoException(email);
  }

}