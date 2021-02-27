import { IsEnum, IsNotEmpty, Max, Min } from "class-validator";

import { TipoCategoria } from "../enums/TipoCategoria";

export default class {
  
  @IsNotEmpty({message: "O nome não foi informado"})
  nome: string;

  @Min(0, {message: "O valorPrevisto não pode ser menor que 0"})
  valorPrevisto: number;
  
  @Min(0, {message: "A porcentagemPrevista não pode ser menor que 0"})
  @Max(100, {message: "A porcentagemPrevista não pode ser maior que 100"})
  porcentagemPrevista: number;

  @IsEnum(TipoCategoria, {message: "O tipo informado não é permitido"})
  tipo: TipoCategoria;
}