import { TipoCategoria } from "../enums/TipoCategoria";

export default class CategoriaAlteradaDto {
  codigo: number;
  nome: string;
  valorPrevisto: number;
  tipo: TipoCategoria;
}