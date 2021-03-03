import CategoriaDaMovimentacaoParaConsultaDto from "./CategoriaDaMovimentacaoParaConsultaDto";

export default class MovimentacaoParaConsultaDto {
  codigo: number;
  descricao: string;
  valor: number;
  data: Date;
  categoria: CategoriaDaMovimentacaoParaConsultaDto;
}