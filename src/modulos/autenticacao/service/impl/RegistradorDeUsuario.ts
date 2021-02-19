import { Inject, Service } from "typedi";

import IUsuario from "../../../common/entity/IUsuario";

import IUsuarioRepository from "../../repository/IUsuarioRepository";
import DadosDeRegistroDto from "../../dto/DadosDeRegistroDto";
import { EUsuarioJaRegistradoException } from "../../exception";
import MapeadorDeUsuario from "../../mapeadores/MapeadorDeUsuario";
import IRegistradorDeUsuario from "../IRegistradorDeUsuario";

@Service("autenticacao.registradorUsuario")
export default class RegistradorDeUsuario implements IRegistradorDeUsuario{
  
  @Inject("autenticacao.usuarioRepository")
  private usuarioRepository: IUsuarioRepository;

  @Inject("autenticacao.mapeadorDeUsuario")
  private mapeadorDeUsuario: MapeadorDeUsuario;
  
  public async registrar(dadosRegistro: DadosDeRegistroDto): Promise<void> {    
    await this.validarSeUsuarioJaEstaRegistrado(dadosRegistro.email);
    const usuario: IUsuario = this.mapeadorDeUsuario.paraEntidade(dadosRegistro);
    this.usuarioRepository.inserir(usuario);  
  }

  private async validarSeUsuarioJaEstaRegistrado(email: string): Promise<void> {
    const usuarioJaEstaRegistrado: boolean = await this.usuarioRepository.existeUsuarioComOEmail(email);

    if (!usuarioJaEstaRegistrado)
      return;

    throw new EUsuarioJaRegistradoException(email);
  }

}