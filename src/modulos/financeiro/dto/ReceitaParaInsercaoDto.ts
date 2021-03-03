import { IsDateString, IsNotEmpty, MaxLength, Min } from "class-validator";

export default class ReceitaParaInsercaoDto{

  @IsNotEmpty({message: "A descricao não foi informada"})
  @MaxLength(300, {message: "A descricao não pode possuir mais que 300 caracteres"})
  descricao: string;

  @Min(0.01, {message: "valor deve ser maior que 0.1"})
  valor: number;

  @IsDateString({strict: true}, {message: "data deve ser enviado no formato correto"})
  data: Date;
}