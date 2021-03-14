import Container, { Inject, Service } from "typedi";


import { TipoMovimentacaoObjetivo } from "../../enums/TipoMovimentacaoObjetivo";
import IConta from "../../entities/IConta";
import IMovimentacao from "../../entities/IMovimentacao";
import IMovimentacaoObjetivo from "../../entities/IMovimentacaoObjetivo";
import IObjetivoFinanceiro from "../../entities/IObjetivoFinanceiro";
import IMovimentacaoRepository from "../../repositories/IMovimentacaoRepository";
import IMovimentacaoFactory from "../IMovimentacaoFactory";

@Service({id: "financeiro.movimentacaoFactory", transient: true})
export default class MovimentacaoFactory implements IMovimentacaoFactory {
  
  @Inject("financeiro.movimentacaoRepository")
  private movimentacaoRepository: IMovimentacaoRepository;
  
  public async gerar(objetivo: IObjetivoFinanceiro, movimentacaoObjetivo: IMovimentacaoObjetivo, conta: IConta): Promise<IMovimentacao> {
    let movimentacao = Container.get<IMovimentacao>("movimentacao");
    movimentacao.Data = movimentacaoObjetivo.Data;
    movimentacao.Descricao = objetivo.Descricao;
    movimentacao.Valor = movimentacaoObjetivo.Valor;
    movimentacao.Categoria = TipoMovimentacaoObjetivo.ehDeposito(movimentacaoObjetivo.Tipo) ? objetivo.CategoriaDeposito : objetivo.CategoriaResgate;
    movimentacao.Conta = conta;

    const maiorOrdem: any = await this.movimentacaoRepository.pesquisarMaiorOrdem(conta.Codigo);
    movimentacao.Ordem = maiorOrdem + 1;
    
    return movimentacao;
  }
}