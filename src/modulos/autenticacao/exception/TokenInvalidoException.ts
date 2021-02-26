import { EBaseException } from "../../../core/exception/BaseException";

export class ETokenInvalidoException extends EBaseException {
  constructor() {
    const CODIGO = '401';
    const MENSAGEM = 'Token inválido';
    super(CODIGO, MENSAGEM);
  }
}
