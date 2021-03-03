import { Body, HttpCode, JsonController, Post, Req, UseBefore } from "routing-controllers";
import Container from "typedi";

import AutenticacaoMiddleware from "../../../middlewares/AutenticacaoMiddleware";
import MovimentacaoParaConsultaDto from "../dto/MovimentacaoParaConsultaDto";

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

  @Post("/receitas/padrao")
  @HttpCode(201)
  public async criarReceitaPadrao(@Req() request: any, @Body() receita: ReceitaParaInsercaoDto): Promise<MovimentacaoParaConsultaDto> {
    let { codigoUsuario } = request;
    const movimentacao = this.mapeadorDeMovimentacao.paraEntidade(receita);
    const novaMovimentacao = await this.gerenciadorMovimentacoes.criarReceitaPadrao(movimentacao, codigoUsuario);
    return this.mapeadorDeMovimentacao.paraDto(novaMovimentacao);
  }

}