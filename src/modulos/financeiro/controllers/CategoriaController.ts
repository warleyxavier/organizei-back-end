import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, Req, UseBefore } from "routing-controllers";
import Container from "typedi";

import AutenticacaoMiddleware from "../../../middlewares/AutenticacaoMiddleware";

import categoriaParaAtualizacaoDto from "../dto/CategoriaParaAtualizacaoDto";
import CategoriaParaConsultaDto from "../dto/CategoriaParaConsultaDto";
import CategoriaParaInsercaoDto from "../dto/CategoriaParaInsercaoDto";
import MapeadorDeCategoria from "../mapeadores/MapeadorDeCategoria";
import IGerenciadorCategoria from "../service/IGerenciadorCategoria";

@JsonController("/categorias")
@UseBefore(AutenticacaoMiddleware)
export default class CategoriaController {

  private gerenciadorCategoria: IGerenciadorCategoria;
  private mapeadorDeCategoria: MapeadorDeCategoria;

  constructor() {
    this.gerenciadorCategoria = Container.get<IGerenciadorCategoria>("financeiro.gerenciadorCategoria");
    this.mapeadorDeCategoria = new MapeadorDeCategoria();
  }

  @Post("/")
  @HttpCode(201)
  public async criar(@Req() request: any, @Body() categoriaParaInsercao: CategoriaParaInsercaoDto): Promise<CategoriaParaConsultaDto> { 
    let { codigoUsuario } = request;
    let categoria = this.mapeadorDeCategoria.paraEntidade(categoriaParaInsercao);
    let novaCategoria = await this.gerenciadorCategoria.criar(categoria, codigoUsuario);
    return this.mapeadorDeCategoria.paraDto(novaCategoria);
  }

  @Put("/:codigoCategoria")
  public async atualizar(@Req() request: any, @Body() categoriaParaAtualizacao: categoriaParaAtualizacaoDto, @Param("codigoCategoria") codigoCategoria: number): Promise<CategoriaParaConsultaDto> {
    let { codigoUsuario } = request;
    let categoria = this.mapeadorDeCategoria.dtoAtualizacaoparaEntidade(categoriaParaAtualizacao);
    let categoriaAtualizada = await this.gerenciadorCategoria.atualizar(categoria, codigoCategoria, codigoUsuario);
    return this.mapeadorDeCategoria.paraDto(categoriaAtualizada);
  }

  @Get("/despesas")
  public async pesquisarCategoriasDeDespesas(@Req() request: any): Promise<CategoriaParaConsultaDto[]> {
    let { codigoUsuario } = request;
    const categorias = await this.gerenciadorCategoria.pesquisarCategoriasDeDespesa(codigoUsuario);
    return this.mapeadorDeCategoria.paraListaDto(categorias);
  }

  @Delete("/:codigoCategoria")
  public async excluir(@Req() request: any, @Param("codigoCategoria") codigoCategoria: number): Promise<void> {
    let { codigoUsuario } = request;
    await this.gerenciadorCategoria.excluir(codigoCategoria, codigoUsuario);
  }

}