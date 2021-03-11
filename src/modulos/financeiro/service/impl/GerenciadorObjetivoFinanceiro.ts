import Container, { Inject, Service } from "typedi";

import IUsuarioRepository from "../../../usuario/repository/IUsuarioRepository";

import { TipoCategoria } from "../../enums/TipoCategoria";
import ICategoria from "../../entities/ICategoria";
import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IObjetivoFinanceiroRepository from "../../repositories/IObjetivoFinanceiroRepository";
import IGerenciadorCategoria from "../IGerenciadorCategoria";
import IGerenciadorObjetivoFinanceiro from "../IGerenciadorObjetivoFinanceiro";

@Service({id: "financeiro.gerenciadorObjetivoFinanceiro", transient: true})
export default class GerenciadorObjetivoFinanceiro implements IGerenciadorObjetivoFinanceiro {
  
  @Inject("usuario.usuarioRepository")
  private usuarioRepository: IUsuarioRepository;

  @Inject("financeiro.objetivoFinanceiroRepository")
  private objetivoRepository: IObjetivoFinanceiroRepository;

  @Inject("financeiro.gerenciadorCategoria")
  private gerenciadorCategoria: IGerenciadorCategoria;

  public async criar(objetivo: IObjetivoFinanceiro, codigoUsuario: number): Promise<IObjetivoFinanceiro> {
    const categoriaDeDespesa = this.gerarCategoria(objetivo.Descricao, TipoCategoria.Despesa);
    const categoriaDeReceita = this.gerarCategoria(objetivo.Descricao, TipoCategoria.Receita);

    objetivo.Usuario = await this.usuarioRepository.pesquisarPorCodigo(codigoUsuario);
    objetivo.CategoriaDeposito = await this.gerenciadorCategoria.criar(categoriaDeDespesa, codigoUsuario);
    objetivo.CategoriaResgate = await this.gerenciadorCategoria.criar(categoriaDeReceita, codigoUsuario);

    return this.objetivoRepository.salvar(objetivo);
  }

  private gerarCategoria(nomeCategoria: string, tipo: TipoCategoria): ICategoria {
    let categoria = Container.get<ICategoria>("categoria");
    categoria.Nome = nomeCategoria;
    categoria.Tipo = tipo;
    return categoria;
  }

  public pesquisar(codigoUsuario: number): Promise<IObjetivoFinanceiro[]> {
    return this.objetivoRepository.pesquisar(codigoUsuario);
  }

}