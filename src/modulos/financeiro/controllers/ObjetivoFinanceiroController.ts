import { Body, Get, JsonController, Param, Post, Put, Req, UseBefore } from "routing-controllers";
import Container from "typedi";

import AutenticacaoMiddleware from "../../../middlewares/AutenticacaoMiddleware";

import ObjetivoParaInsercaoDto from "../dto/ObjetivoFinanceiroParaInsercaoDto";
import ObjetivoFinanceiroParaConsultaDto from "../dto/ObjetivoFinanceiroParaConsultaDto";
import MovimentacaoObjetivoParaConsultaDto from "../dto/MovimentacaoObjetivoParaConsultaDto";
import MapeadorDeObjetivoFinanceiro from "../mapeadores/MapeadorDeObjetivoFinanceiro";
import MapeadorDeMovimentacaoObjetivo from "../mapeadores/MapeadorDeMovimentacaoObjetivo";
import IGerenciadorObjetivoFinanceiro from "../service/IGerenciadorObjetivoFinanceiro";
import { runInThisContext } from "vm";
import ObjetivoFinanceiroParaAtualizacaoDto from "../dto/ObjetivoFinanceiroParaAtualizacaoDto";

@JsonController("/objetivos")
@UseBefore(AutenticacaoMiddleware)
export default class ObjetivoFinanceiroController {

  private gerenciadorObjetivo: IGerenciadorObjetivoFinanceiro;
  private mapeadorObjetivo: MapeadorDeObjetivoFinanceiro;
  private mapeadorMovimentacao: MapeadorDeMovimentacaoObjetivo;

  constructor() {
    this.gerenciadorObjetivo = Container.get<IGerenciadorObjetivoFinanceiro>("financeiro.gerenciadorObjetivoFinanceiro");
    this.mapeadorObjetivo = new MapeadorDeObjetivoFinanceiro();
    this.mapeadorMovimentacao = new MapeadorDeMovimentacaoObjetivo();
  }

  @Post("/")
  public async criar(@Req() request: any, @Body() dto: ObjetivoParaInsercaoDto): Promise<ObjetivoFinanceiroParaConsultaDto> {
    const { codigoUsuario } = request;
    const objetivo = this.mapeadorObjetivo.paraEntidade(dto);
    const objetivoInserido = await this.gerenciadorObjetivo.criar(objetivo, codigoUsuario);
    return this.mapeadorObjetivo.paraDto(objetivoInserido);
  }

  @Get("/")
  public async pesquisar(@Req() request: any): Promise<ObjetivoFinanceiroParaConsultaDto[]> {
    const { codigoUsuario } = request;
    const objetivos = await this.gerenciadorObjetivo.pesquisar(codigoUsuario);
    return this.mapeadorObjetivo.paraListaDto(objetivos);    
  }

  @Put("/:codigoObjetivo")
  public async atualizar(@Req() request: any, @Body() dadosAtualizacao: ObjetivoFinanceiroParaAtualizacaoDto, @Param("codigoObjetivo") codigoObjetivo: number): Promise<ObjetivoFinanceiroParaConsultaDto> {
    const { codigoUsuario } = request;
    const objetivo = this.mapeadorObjetivo.dtoAtualizacaoParaEntidade(dadosAtualizacao);
    
    const objetivoAtualizado = await this.gerenciadorObjetivo.atualizar(objetivo, codigoObjetivo, codigoUsuario);
    return this.mapeadorObjetivo.paraDto(objetivoAtualizado);
  }

  @Get("/:codigoObjetivo/movimentacoes")
  public async pesquisarMovimentacoes(@Req() request: any, @Param("codigoObjetivo") codigoObjetivo: number): Promise<MovimentacaoObjetivoParaConsultaDto[]> {
    const { codigoUsuario } = request;
    const movimentacoes = await this.gerenciadorObjetivo.pesquisarMovimentacoes(codigoObjetivo, codigoUsuario);
    return this.mapeadorMovimentacao.paraListaDtos(movimentacoes);
  }

}