import { Body, Get, JsonController, OnUndefined, Post } from "routing-controllers";
import Container from "typedi";

import DadosParaAutenticacao from "../dto/DadosParaAutenticacao";
import AccessToken from "../dto/AccessToken";
import IAutenticador from "../service/IAutenticador";

@JsonController("/autenticacao")
export default class AutenticacaoController {

  private autenticador: IAutenticador;

  constructor() {
    this.autenticador = Container.get<IAutenticador>("autenticacao.autenticador");
  }

  @Get("/autenticar")
  @OnUndefined(200)
  public async autenticar(@Body() dadosParaAutenticacao: DadosParaAutenticacao): Promise<AccessToken> {
    return await this.autenticador.autenticar(dadosParaAutenticacao.email, dadosParaAutenticacao.senha);
  }

}