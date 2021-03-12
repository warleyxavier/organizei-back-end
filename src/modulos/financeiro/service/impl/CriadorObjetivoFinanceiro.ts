import Container, { Inject, Service } from "typedi";

import IUsuarioRepository from "../../../usuario/repository/IUsuarioRepository";

import { TipoCategoria } from "../../enums/TipoCategoria";
import { TipoMovimentacaoObjetivo } from "../../enums/TipoMovimentacaoObjetivo";
import ICategoria from "../../entities/ICategoria";
import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IMovimentacaoObjetivo from "../../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiroRepository from "../../repositories/IObjetivoFinanceiroRepository";
import ICriadorObjetivoFinanceiro from "../ICriadorObjetivoFinanceiro";
import IGerenciadorCategoria from "../IGerenciadorCategoria";

@Service({id: "financeiro.criadorObjetivoFinanceiro", transient: true})
export default class CriadorObjetivoFinanceiro implements ICriadorObjetivoFinanceiro {
  
  @Inject("usuario.usuarioRepository")
  private usuarioRepository: IUsuarioRepository;

  @Inject("financeiro.gerenciadorCategoria")
  private gerenciadorCategoria: IGerenciadorCategoria;

  @Inject("financeiro.objetivoFinanceiroRepository")
  private objetivoRepository: IObjetivoFinanceiroRepository;
  
  public async criar(objetivo: IObjetivoFinanceiro, codigoUsuario: number): Promise<IObjetivoFinanceiro> {
    const categoriaDeDespesa = this.gerarCategoria(objetivo.Descricao, TipoCategoria.Despesa);
    const categoriaDeReceita = this.gerarCategoria(objetivo.Descricao, TipoCategoria.Receita);

    objetivo.Usuario = await this.usuarioRepository.pesquisarPorCodigo(codigoUsuario);
    objetivo.CategoriaDeposito = await this.gerenciadorCategoria.criar(categoriaDeDespesa, codigoUsuario);
    objetivo.CategoriaResgate = await this.gerenciadorCategoria.criar(categoriaDeReceita, codigoUsuario);

    const objetivoInserido = await this.objetivoRepository.salvar(objetivo);

    if (objetivoInserido.Saldo > 0)
      await this.gerarMovimentacao(objetivoInserido);

    return objetivoInserido;
  }

  private gerarCategoria(nomeCategoria: string, tipo: TipoCategoria): ICategoria {
    let categoria = Container.get<ICategoria>("categoria");
    categoria.Nome = nomeCategoria;
    categoria.Tipo = tipo;
    return categoria;
  }

  private async gerarMovimentacao(objetivo: IObjetivoFinanceiro): Promise<void> {
    const movimentacao = Container.get<IMovimentacaoObjetivo>("movimentacaoObjetivo");
    movimentacao.CodigoObjetivo = objetivo.Codigo;
    movimentacao.Tipo = TipoMovimentacaoObjetivo.Deposito;
    movimentacao.Valor = objetivo.Saldo;
    movimentacao.Data = new Date();
    movimentacao.Categoria = objetivo.CategoriaDeposito;
    await this.objetivoRepository.salvarMovimentacao(movimentacao);
  }

}