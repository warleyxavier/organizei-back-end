import { EBaseException } from "../../../core/exception/BaseException";

export class SenhaIncorretaUsuario extends EBaseException {
  constructor() {
    super("400", "Senha incorreta para o usuário");
  }
}