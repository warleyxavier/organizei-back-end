import { Inject, Service } from "typedi";

import IUsuarioRepository from "../../../usuario/repository/IUsuarioRepository";

import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IObjetivoFinanceiroRepository from "../../repositories/IObjetivoFinanceiroRepository";
import IGerenciadorObjetivoFinanceiro from "../IGerenciadorObjetivoFinanceiro";

@Service({id: "financeiro.gerenciadorObjetivoFinanceiro", transient: true})
export default class GerenciadorObjetivoFinanceiro implements IGerenciadorObjetivoFinanceiro {
  
  @Inject("usuario.usuarioRepository")
  private usuarioRepository: IUsuarioRepository;

  @Inject("financeiro.objetivoFinanceiroRepository")
  private objetivoRepository: IObjetivoFinanceiroRepository;

  public async criar(objetivo: IObjetivoFinanceiro, codigoUsuario: number): Promise<IObjetivoFinanceiro> {
    const usuario = await this.usuarioRepository.pesquisarPorCodigo(codigoUsuario);
    objetivo.Usuario = usuario;
    return this.objetivoRepository.salvar(objetivo);
  }


}