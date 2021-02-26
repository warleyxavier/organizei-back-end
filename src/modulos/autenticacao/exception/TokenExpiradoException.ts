import { EBaseException } from "../../../core/exception/BaseException";

export class ETokenExpiradoException extends EBaseException {
  constructor() {
    const CODIGO = '401';
    const MENSAGEM = 'Token expirado';
    super(CODIGO, MENSAGEM);
  }
}
