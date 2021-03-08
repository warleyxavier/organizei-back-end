import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Req, UseBefore } from "routing-controllers";
import Container from "typedi";

import AutenticacaoMiddleware from "../../../middlewares/AutenticacaoMiddleware";

import MovimentacaoParaConsultaDto from "../dto/MovimentacaoParaConsultaDto";
import MovimentacaoParaInsercaoDto from "../dto/MovimentacaoParaInsercaoDto";
import ReceitaParaInsercaoDto from "../dto/ReceitaParaInsercaoDto";
import MapeadorDeMovimentacao from "../mapeadores/MapeadorDeMovimentacao";
import IGerenciadorMovimentacao from "../service/IGerenciadorMovimentacao";

@JsonController("/movimentacoes")
@UseBefore(AutenticacaoMiddleware)
export default class MovimentacaoController {

  private gerenciadorMovimentacoes: IGerenciadorMovimentacao;
  private mapeadorDeMovimentacao: MapeadorDeMovimentacao;

  constructor() {
    this.gerenciadorMovimentacoes = Container.get<IGerenciadorMovimentacao>("financeiro.gerenciadorMovimentacao");
    this.mapeadorDeMovimentacao = new MapeadorDeMovimentacao();
  }

  @Get("/conta-padrao")
  public async pesquisarMovimentacoesContaPadrao(@Req() request: any): Promise<MovimentacaoParaConsultaDto[]> {
    let { codigoUsuario } = request;
    const movimentacoes = await this.gerenciadorMovimentacoes.pesquisarMovimentacoesContaPadrao(codigoUsuario);
    console.log(movimentacoes);
    return this.mapeadorDeMovimentacao.paraListaDto(movimentacoes);
  }

  @Post("/conta-padrao")
  @HttpCode(201)
  public async criarMovimentacaoContaPadrao(@Req() request: any, @Body() movimentacaoDto: MovimentacaoParaInsercaoDto): Promise<MovimentacaoParaConsultaDto> {
    let { codigoUsuario } = request;
    const movimentacao = this.mapeadorDeMovimentacao.dtoInsercaoparaEntidade(movimentacaoDto);
    const novaMovimentacao = await this.gerenciadorMovimentacoes.criarMovimentacaoNaContaPadrao(movimentacao, movimentacaoDto.codigoCategoria, codigoUsuario);
    return this.mapeadorDeMovimentacao.paraDto(novaMovimentacao);
  }

  @Post("/receitas/padrao")
  @HttpCode(201)
  public async criarReceitaPadrao(@Req() request: any, @Body() receita: ReceitaParaInsercaoDto): Promise<MovimentacaoParaConsultaDto> {
    let { codigoUsuario } = request;
    const movimentacao = this.mapeadorDeMovimentacao.paraEntidade(receita);
    const novaMovimentacao = await this.gerenciadorMovimentacoes.criarReceitaPadrao(movimentacao, codigoUsuario);
    return this.mapeadorDeMovimentacao.paraDto(novaMovimentacao);
  }

  @Delete("/:codigoMovimentacao")
  public async excluir(@Req() request: any, @Param("codigoMovimentacao") codigoMovimentacao: number): Promise<void> {
    let { codigoUsuario } = request;
    await this.gerenciadorMovimentacoes.excluir(codigoMovimentacao, codigoUsuario);
  }

}