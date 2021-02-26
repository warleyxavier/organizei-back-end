import { EBaseException } from "../../../core/exception/BaseException";

export class ETokenNaoInformadoException extends EBaseException {
  constructor() {
    const CODIGO = '401';
    const MENSAGEM = 'Token de autenticação não informado';
    super(CODIGO, MENSAGEM);
  }
}
