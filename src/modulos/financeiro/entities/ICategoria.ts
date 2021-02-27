import IUsuario from "../../usuario/entities/IUsuario";

import { TipoCategoria } from "../enums/TipoCategoria";

export default interface ICategoria {
  Codigo: number;
  Nome: string;
  ValorPrevisto: number;
  PorcentagemPrevista: number;
  Usuario: IUsuario;
  Tipo: TipoCategoria;

  pertenceAoUsuario(codigoUsuario: number): boolean;
}