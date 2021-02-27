import { EBaseException } from "../../../core/exception/BaseException"

export class ECategoriaNaoPertenceAoUsuarioException extends EBaseException {
  constructor() {
    super("400", "Categoria não pertence ao usuário autenticado");
  }
}