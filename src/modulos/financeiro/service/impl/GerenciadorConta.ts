import { Inject, Service } from "typedi";

import IConta from "../../entities/IConta";
import IContaRepository from "../../repositories/IContaRepository";
import IGerenciadorConta from "../IGerenciadorConta";

@Service("financeiro.gerenciadorConta")
export default class GerenciadorConta implements IGerenciadorConta {

  @Inject("financeiro.contaRepository")
  private contaRepository: IContaRepository;

  public pesquisarContaPadrao(codigoUsuario: number): Promise<IConta> {
    return this.contaRepository.pesquisarContaPadrao(codigoUsuario);
  }

}