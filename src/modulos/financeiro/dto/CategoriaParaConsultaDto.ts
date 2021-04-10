import { TipoCategoria } from "../enums/TipoCategoria";

export default class CategoriaParaConsultaDto {
  codigo: number;
  nome: string;
  valorPrevisto: number;
  porcentagemPrevista: number;
  tipo: TipoCategoria;
}