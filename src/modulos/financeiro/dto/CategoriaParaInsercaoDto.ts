import { IsEnum, IsNotEmpty, Min } from "class-validator";

import { TipoCategoria } from "../enums/TipoCategoria";

export default class {
  
  @IsNotEmpty({message: "O nome não foi informado"})
  nome: string;

  @Min(0, {message: "O valorPrevisto não pode ser menor que zero"})
  valorPrevisto: number;
  
  @IsEnum(TipoCategoria, {message: "O tipo informado não é permitido"})
  tipo: TipoCategoria;
}