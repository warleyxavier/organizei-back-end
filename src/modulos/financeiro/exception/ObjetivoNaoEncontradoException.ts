import { EBaseException } from "../../../core/exception/BaseException";

export class EObjetivoNaoEncontradoException extends EBaseException {
  constructor() {
    super("400", "Objetivo não encontrado");
  }
}