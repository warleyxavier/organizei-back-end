import { EBaseException } from "../../../core/exception/BaseException";

export class UsuarioNaoEncontradoException extends EBaseException {
  constructor(emailUsuario: string) {
    super("400", `Não foi encontrado nenhum usuário com o email ${emailUsuario}`);
  }
}