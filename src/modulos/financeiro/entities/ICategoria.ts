import IUsuario from "../../usuario/entities/IUsuario";

import { TipoCategoria } from "../enums/TipoCategoria";

export default interface ICategoria {
  Codigo: number;
  Nome: string;
  ValorPrevisto: number;
  Usuario: IUsuario;
  Tipo: TipoCategoria;
}