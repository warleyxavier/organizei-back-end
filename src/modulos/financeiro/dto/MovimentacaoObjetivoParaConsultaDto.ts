import { TipoMovimentacaoObjetivo } from "../enums/TipoMovimentacaoObjetivo";

export default class MovimentacaoObjetivoParaConsultaDto {
  codigo: number;
  Tipo: TipoMovimentacaoObjetivo;
  Valor: number;
  Data: string;
}