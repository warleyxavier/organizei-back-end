import { EBaseException } from "../../../core/exception/BaseException";

export class EMovimentacaoNaoEncontradaException extends EBaseException {
  constructor() {
    super("400", "Movimentação não encontrada");
  } 
}