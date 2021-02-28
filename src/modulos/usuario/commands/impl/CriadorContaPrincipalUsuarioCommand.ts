import IConta from "modulos/financeiro/entities/IConta";
import Container, { Inject, Service } from "typedi";

import IContaRepository from "modulos/financeiro/repositories/IContaRepository";

import IUsuario from "../../entities/IUsuario";
import IAcaoPosRegistroUsuarioCommand from "../IAcaoPosRegistroUsuarioCommand";

@Service({id: "usuario.criadorContaPrincipalUsuario", transient: true})
export default class CriadorContaPrincipalUsuarioCommand implements IAcaoPosRegistroUsuarioCommand {

  @Inject("financeiro.contaRepository")
  private contaRepository: IContaRepository;

  public executar(usuario: IUsuario): void {
    let conta = Container.get<IConta>("conta");
    conta.Nome = "Conta Principal";
    conta.Usuario = usuario;
    this.contaRepository.inserir(conta);
  }

}