import { EBaseException } from "../../../core/exception/BaseException"

export class EObjetivoNaoPertenceAoUsuarioException extends EBaseException {
  constructor() {
    super("400", "Objetivo não pertence ao usuário autenticado");
  }
}