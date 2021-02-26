import { Body, JsonController, OnUndefined, Post } from "routing-controllers";
import Container from "typedi";

import MapeadorDeUsuario from "../mapeadores/MapeadorDeUsuario";
import DadosDeRegistroDto from "../dto/DadosDeRegistroDto";
import IRegistradorDeUsuario from "../service/IRegistradorDeUsuario";
import IAcaoPosRegistroUsuarioCommand from "../commands/IAcaoPosRegistroUsuarioCommand";

@JsonController("/usuarios")
export default class UsuarioController {
  private mapeadorDeUsuario: MapeadorDeUsuario;
  private registradorUsuario: IRegistradorDeUsuario;

  constructor() {   
    this.registradorUsuario = Container.get<IRegistradorDeUsuario>("usuario.registradorUsuario");
    this.registradorUsuario.adicionarAcaoPosRegistro(Container.get<IAcaoPosRegistroUsuarioCommand>("usuario.criadorContaPrincipalUsuario"));

    this.mapeadorDeUsuario = Container.get<MapeadorDeUsuario>("usuario.mapeadorDeUsuario"); 
  }

  @Post("/registrar")
  @OnUndefined(201)
  public async registrar(@Body() dadosRegistro: DadosDeRegistroDto) {
    await this.registradorUsuario.registrar(this.mapeadorDeUsuario.paraEntidade(dadosRegistro));
  }
}