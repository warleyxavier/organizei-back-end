import { Get, JsonController, Req, UseBefore } from "routing-controllers";
import Container from "typedi";

import AutenticacaoMiddleware from "../../../middlewares/AutenticacaoMiddleware";

import ContaParaConsultaDto from "../dto/ContaParaConsultaDto";
import MapeadorDeConta from "../mapeadores/MapeadorDeConta";
import IGerenciadorConta from "../service/IGerenciadorConta";

@JsonController("/contas")
@UseBefore(AutenticacaoMiddleware)
export default class ContaController {

  private gerenciadorConta: IGerenciadorConta;
  private mapeador: MapeadorDeConta;

  constructor() {
    this.gerenciadorConta = Container.get<IGerenciadorConta>("financeiro.gerenciadorConta");
    this.mapeador = new MapeadorDeConta();
  }


  @Get("/padrao")
  public async pesquisarContaPadrao(@Req() request: any): Promise<ContaParaConsultaDto> {
    let { codigoUsuario } = request;
    const conta = await this.gerenciadorConta.pesquisarContaPadrao(codigoUsuario);
    return this.mapeador.paraDto(conta);
  }

}