import { TipoMovimentacaoObjetivo } from "../enums/TipoMovimentacaoObjetivo";

export default class MovimentacaoObjetivoParaConsultaDto {
  codigo: number;
  Tipo: string;
  Valor: number;
  Data: string;
}