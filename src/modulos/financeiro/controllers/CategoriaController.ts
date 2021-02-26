import { Body, JsonController, Post, Req, UseBefore } from "routing-controllers";
import Container from "typedi";

import AutenticacaoMiddleware from "../../../middlewares/AutenticacaoMiddleware";

import CategoriaAlteradaDto from "../dto/CategoriaAlteradaDto";
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
  public async criar(@Req() request: any, @Body() categoriaParInsercao: CategoriaParaInsercaoDto): Promise<CategoriaAlteradaDto> { 
    let { codigoUsuario } = request;
    let categoria = this.mapeadorDeCategoria.paraEntidade(categoriaParInsercao);
    let novaCategoria = await this.gerenciadorCategoria.criar(categoria, codigoUsuario);
    return this.mapeadorDeCategoria.paraDto(novaCategoria);
  } 

}