import Container from "typedi";
import ObjetivoFinanceiroParaConsultaDto from "../dto/ObjetivoFinanceiroParaConsultaDto";

import ObjetivoParaInsercaoDto from "../dto/ObjetivoFinanceiroParaInsercaoDto";
import IObjetivoFinanceiro from "../entities/IObjetivoFinanceiro";

export default class MapeadorDeObjetivoFinanceiro {
  public paraEntidade(dto: ObjetivoParaInsercaoDto): IObjetivoFinanceiro {
    let entidade = Container.get<IObjetivoFinanceiro>("objetivoFinanceiro");
    entidade.Descricao = dto.descricao;
    entidade.Prazo = dto.prazo;
    entidade.ValorMeta = dto.valorMeta || 0;
    entidade.Saldo = dto.saldoInicial || 0;
    return entidade;
  }

  public paraDto(objetivo: IObjetivoFinanceiro): ObjetivoFinanceiroParaConsultaDto {
    let dto = new ObjetivoFinanceiroParaConsultaDto();
    dto.codigo = objetivo.Codigo;
    dto.descricao = objetivo.Descricao;
    dto.prazo = objetivo.Prazo;
    dto.valorMeta = objetivo.ValorMeta;
    dto.saldo = objetivo.Saldo;
    return dto;
  }
}