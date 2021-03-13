import * as moment from "moment";

import MovimentacaoObjetivoParaConsultaDto from "../dto/MovimentacaoObjetivoParaConsultaDto";
import IMovimentacaoObjetivo from "../entities/IMovimentacaoObjetivo";

export default class MapeadorDeMovimentacaoObjetivo {
  public paraListaDtos(entidades: IMovimentacaoObjetivo[]): MovimentacaoObjetivoParaConsultaDto[] {
    return entidades.map(entidade => {
      let dto = new MovimentacaoObjetivoParaConsultaDto();
      dto.codigo = entidade.Codigo;
      dto.Tipo = entidade.Tipo;
      dto.Valor = entidade.Valor;
      dto.Data = moment(entidade.Data).format("DD/MM/YYYY");
      return dto;
    })
  }
}