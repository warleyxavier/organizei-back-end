import * as moment from "moment";
import Container from "typedi";

import MovimentacaoObjetivoParaConsultaDto from "../dto/MovimentacaoObjetivoParaConsultaDto";
import MovimentacaoObjetivoParaInsercaoDto from "../dto/MovimentacaoObjetivoParaInsercaoDto";
import { TipoMovimentacaoObjetivo } from "../enums/TipoMovimentacaoObjetivo";
import IMovimentacaoObjetivo from "../entities/IMovimentacaoObjetivo";

export default class MapeadorDeMovimentacaoObjetivo {
  public paraDto(entidade: IMovimentacaoObjetivo): MovimentacaoObjetivoParaConsultaDto {
    let dto = new MovimentacaoObjetivoParaConsultaDto();
    dto.codigo = entidade.Codigo;
    dto.Tipo = typeof entidade.Tipo === 'number' ? TipoMovimentacaoObjetivo[entidade.Tipo] : entidade.Tipo;
    dto.Valor = entidade.Valor;
    dto.Data = moment(entidade.Data).format("DD/MM/YYYY");
    return dto;
  }

  public paraListaDtos(entidades: IMovimentacaoObjetivo[]): MovimentacaoObjetivoParaConsultaDto[] {
    return entidades.map(entidade => this.paraDto(entidade));
  }

  public paraEntidade(dto: MovimentacaoObjetivoParaInsercaoDto): IMovimentacaoObjetivo {
    let entidade = Container.get<IMovimentacaoObjetivo>("movimentacaoObjetivo");
    entidade.Data = dto.data;
    entidade.Valor = dto.valor;
    return entidade;
  }
}