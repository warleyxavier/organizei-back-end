import { IsDateString, IsNotEmpty, MaxLength, Min } from "class-validator";

export default class ObjetivoFinanceiroParaAtualizacaoDto {

  @IsNotEmpty({message: "A descricao não foi informada"})
  @MaxLength(200, {message: "A descricao não pode possuir mais que 200 caracteres"})
  descricao: string;

  @Min(0.01, {message: "O valorMeta não pode ser menor que 0.01"})
  valorMeta: number;

  @IsDateString({strict: true}, {message: "data deve ser enviado no formato correto"})
  prazo: Date;
}
