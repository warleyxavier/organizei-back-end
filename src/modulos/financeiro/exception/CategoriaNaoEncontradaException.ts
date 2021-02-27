import { EBaseException } from "../../../core/exception/BaseException";

export class ECategoriaNaoEncontradaException extends EBaseException {
  constructor() {
    super("400", "Categoria não encontrada");
  }
}