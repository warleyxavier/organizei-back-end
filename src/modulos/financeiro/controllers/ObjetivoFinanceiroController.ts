import { Body, Get, JsonController, Post, Req, UseBefore } from "routing-controllers";
import Container from "typedi";

import AutenticacaoMiddleware from "../../../middlewares/AutenticacaoMiddleware";

import ObjetivoParaInsercaoDto from "../dto/ObjetivoFinanceiroParaInsercaoDto";
import ObjetivoFinanceiroParaConsultaDto from "../dto/ObjetivoFinanceiroParaConsultaDto";
import MapeadorDeObjetivoFinanceiro from "../mapeadores/MapeadorDeObjetivoFinanceiro";
import IGerenciadorObjetivoFinanceiro from "../service/IGerenciadorObjetivoFinanceiro";
import { runInThisContext } from "vm";

@JsonController("/objetivos")
@UseBefore(AutenticacaoMiddleware)
export default class ObjetivoFinanceiroController {

  private gerenciadorObjetivo: IGerenciadorObjetivoFinanceiro;
  private mapeador: MapeadorDeObjetivoFinanceiro;

  constructor() {
    this.gerenciadorObjetivo = Container.get<IGerenciadorObjetivoFinanceiro>("financeiro.gerenciadorObjetivoFinanceiro");
    this.mapeador = new MapeadorDeObjetivoFinanceiro();
  }

  @Post("/")
  public async criar(@Req() request: any, @Body() dto: ObjetivoParaInsercaoDto): Promise<ObjetivoFinanceiroParaConsultaDto> {
    const { codigoUsuario } = request;
    const objetivo = this.mapeador.paraEntidade(dto);
    const objetivoInserido = await this.gerenciadorObjetivo.criar(objetivo, codigoUsuario);
    return this.mapeador.paraDto(objetivoInserido);
  }

  @Get("/")
  public async pesquisar(@Req() request: any): Promise<ObjetivoFinanceiroParaConsultaDto[]> {
    const { codigoUsuario } = request;
    const objetivos = await this.gerenciadorObjetivo.pesquisar(codigoUsuario);
    return this.mapeador.paraListaDto(objetivos);    
  }

}