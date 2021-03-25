import { Inject, Service } from "typedi";

import { Transaction } from "../../../../core/decorators/Transaction";

import IUsuario from "../../entities/IUsuario";

import IAcaoPosRegistroUsuarioCommand from "../../commands/IAcaoPosRegistroUsuarioCommand";
import IUsuarioRepository from "../../repository/IUsuarioRepository";
import { EUsuarioJaRegistradoException } from "../../exception";
import IRegistradorDeUsuario from "../IRegistradorDeUsuario";

@Service({id: "usuario.registradorUsuario", transient: true})
export default class RegistradorDeUsuario implements IRegistradorDeUsuario{
  
  @Inject("usuario.usuarioRepository")
  private usuarioRepository: IUsuarioRepository;

  private acoesPosRegistro: IAcaoPosRegistroUsuarioCommand[] = [];
  
  public adicionarAcaoPosRegistro(acao: IAcaoPosRegistroUsuarioCommand): void {
    this.acoesPosRegistro.push(acao);
  }

  @Transaction()
  public async registrar(usuario: IUsuario): Promise<void> {    
    await this.validarSeUsuarioJaEstaRegistrado(usuario.EMail);
    const usuarioSalvo = await this.usuarioRepository.inserir(usuario);  
    await this.executarAcoesPosRegistro(usuarioSalvo);
  }

  private async validarSeUsuarioJaEstaRegistrado(email: string): Promise<void> {
    const usuarioJaEstaRegistrado: boolean = await this.usuarioRepository.existeUsuarioComOEmail(email);

    if (!usuarioJaEstaRegistrado)
      return;

    throw new EUsuarioJaRegistradoException(email);
  }

  private async executarAcoesPosRegistro(usuario: IUsuario): Promise<void> {
    await this.acoesPosRegistro.forEach(async acao => await acao.executar(usuario));
  }

}