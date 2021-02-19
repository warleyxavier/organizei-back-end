import { EBaseException } from "../../../core/exception/BaseException";

export class EUsuarioJaRegistradoException extends EBaseException {
  constructor(email: string) {
    super("400", `Já existe um usuário registrado com o email ${email}`);
  }
}