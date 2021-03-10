import { IsDateString, IsNotEmpty, MaxLength } from "class-validator";

export default class ObjetivoFinanceiroParaInsercaoDto {

  @IsNotEmpty({message: "A descricao não foi informada"})
  @MaxLength(200, {message: "A descricao não pode possuir mais que 200 caracteres"})
  descricao: string;

  valorMeta: number;
  saldoInicial: number;

  @IsDateString({strict: true}, {message: "data deve ser enviado no formato correto"})
  prazo: Date;
}
