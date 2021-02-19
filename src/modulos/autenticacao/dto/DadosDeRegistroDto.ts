import EDadosIncompletosDeRegistroException from "../exception/DadosIncompletosDeRegistroException";

export default class {
  nomeCompleto: string;
  email: string;
  senha: string;

  public validarConsistencia(): void {
    if (!this.nomeCompleto)
      throw new EDadosIncompletosDeRegistroException("nomeCompleto");

    if (!this.email)
      throw new EDadosIncompletosDeRegistroException("email");

    if (!this.senha)
      throw new EDadosIncompletosDeRegistroException("senha");
  }
}