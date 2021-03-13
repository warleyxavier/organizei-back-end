import Container from "typedi";
import * as moment from "moment";

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
    dto.prazo = moment(objetivo.Prazo).format("DD/MM/YYYY");
    dto.valorMeta = objetivo.ValorMeta;
    dto.saldo = objetivo.Saldo;
    dto.percentualAtingido = ((Number(dto.saldo) * 100) / Number(dto.valorMeta)).toFixed(2) + '%';
    return dto;
  }

  public paraListaDto(objetivos: IObjetivoFinanceiro[]): ObjetivoFinanceiroParaConsultaDto[] {
    return objetivos.map(objetivo => this.paraDto(objetivo));
  } 
}