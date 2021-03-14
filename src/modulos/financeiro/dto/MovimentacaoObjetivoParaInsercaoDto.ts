import { IsDateString, Min } from "class-validator";

export default class MovimentacaoObjetivoParaInsercaoDto {
  
  @IsDateString({strict: true}, {message: "data deve ser enviado no formato correto"})
  data: Date;

  @Min(0.01, {message: "O valor deve ser maior que 0"})
  valor: number;
}