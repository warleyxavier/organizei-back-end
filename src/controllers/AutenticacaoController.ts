import { Body, JsonController, OnUndefined, Post } from "routing-controllers";
import Container from "typedi";

import DadosDeRegistroDto from "../modulos/autenticacao/dto/DadosDeRegistroDto";
import IRegistradorDeUsuario from "../modulos/autenticacao/service/IRegistradorDeUsuario";

@JsonController("/autenticacao")
export default class AutenticacaoController {

  private registradorUsuario: IRegistradorDeUsuario;

  constructor() {
    this.registradorUsuario = Container.get<IRegistradorDeUsuario>("autenticacao.registradorUsuario");
  }

  @Post("/registrar")
  @OnUndefined(201)
  public async registrar(@Body() dadosRegistro: DadosDeRegistroDto) {
    dadosRegistro.validarConsistencia();
    await this.registradorUsuario.registrar(dadosRegistro);
  }

}