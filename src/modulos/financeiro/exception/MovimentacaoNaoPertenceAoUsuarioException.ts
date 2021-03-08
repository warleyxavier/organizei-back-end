import { EBaseException } from "../../../core/exception/BaseException"

export class EMovimentacaoNaoPertenceAoUsuarioException extends EBaseException {
  constructor() {
    super("400", "Movimentacao não pertence ao usuário autenticado");
  }
}