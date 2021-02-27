import { Body, Delete, HttpCode, JsonController, Param, Post, Req, UseBefore } from "routing-controllers";
import Container from "typedi";

import AutenticacaoMiddleware from "../../../middlewares/AutenticacaoMiddleware";

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
  public async criar(@Req() request: any, @Body() categoriaParInsercao: CategoriaParaInsercaoDto): Promise<CategoriaParaConsultaDto> { 
    let { codigoUsuario } = request;
    let categoria = this.mapeadorDeCategoria.paraEntidade(categoriaParInsercao);
    let novaCategoria = await this.gerenciadorCategoria.criar(categoria, codigoUsuario);
    return this.mapeadorDeCategoria.paraDto(novaCategoria);
  }

  @Delete("/:codigoCategoria")
  public async excluir(@Req() request: any, @Param("codigoCategoria") codigoCategoria: number): Promise<void> {
    let { codigoUsuario } = request;
    await this.gerenciadorCategoria.excluir(codigoCategoria, codigoUsuario);
  }

}