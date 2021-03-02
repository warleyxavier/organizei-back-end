import { Body, HttpCode, JsonController, Post, Req, UseBefore } from "routing-controllers";

import AutenticacaoMiddleware from "../../../middlewares/AutenticacaoMiddleware";

import ReceitaParaInsercaoDto from "../dto/ReceitaParaInsercaoDto";

@JsonController("/movimentacoes")
@UseBefore(AutenticacaoMiddleware)
export default class MovimentacaoController {

  @Post("/receitas/padrao")
  @HttpCode(201)
  public async criarReceitaPadrao(@Req() request: any, @Body() movimentacao: ReceitaParaInsercaoDto): Promise<void> {

  }

}