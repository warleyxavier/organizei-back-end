import { Body, Get, JsonController, OnUndefined, Post } from "routing-controllers";
import Container from "typedi";

import MapeadorDeUsuario from "../modulos/autenticacao/mapeadores/MapeadorDeUsuario";
import DadosDeRegistroDto from "../modulos/autenticacao/dto/DadosDeRegistroDto";
import DadosParaAutenticacao from "../modulos/autenticacao/dto/DadosParaAutenticacao";
import AccessToken from "../modulos/autenticacao/dto/AccessToken";
import IRegistradorDeUsuario from "../modulos/autenticacao/service/IRegistradorDeUsuario";
import IAutenticador from "../modulos/autenticacao/service/IAutenticador";

@JsonController("/autenticacao")
export default class AutenticacaoController {

  private registradorUsuario: IRegistradorDeUsuario;
  private autenticador: IAutenticador;
  private mapeadorDeUsuario: MapeadorDeUsuario;

  constructor() {
    this.registradorUsuario = Container.get<IRegistradorDeUsuario>("autenticacao.registradorUsuario");
    this.autenticador = Container.get<IAutenticador>("autenticacao.autenticador");
    this.mapeadorDeUsuario = Container.get<MapeadorDeUsuario>("autenticacao.mapeadorDeUsuario");
  }

  @Post("/registrar")
  @OnUndefined(201)
  public async registrar(@Body() dadosRegistro: DadosDeRegistroDto) {
    await this.registradorUsuario.registrar(this.mapeadorDeUsuario.paraEntidade(dadosRegistro));
  }

  @Get("/autenticar")
  @OnUndefined(200)
  public async autenticar(@Body() dadosParaAutenticacao: DadosParaAutenticacao): Promise<AccessToken> {
    return await this.autenticador.autenticar(dadosParaAutenticacao.email, dadosParaAutenticacao.senha);
  }

}