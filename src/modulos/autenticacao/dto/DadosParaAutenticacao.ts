import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export default class DadosParaAutenticacao {

  @IsNotEmpty({ message: "O Email não foi informado" })
  @IsEmail({}, {message: "O Email informado não é válido"})
  email: string;

  @IsNotEmpty({ message: "A senha não foi informada" })
  @MinLength(6, { message: "A senha deve possuir no mínimo 6 caracteres" })
  senha: string;
}