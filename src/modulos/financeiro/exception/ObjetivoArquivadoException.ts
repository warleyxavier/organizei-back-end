import { EBaseException } from "../../../core/exception/BaseException";

export class EObjetivoArquivadoException extends EBaseException {
  constructor() {
    super("400", "Não é permitido realizar movimentações em um objetivo arquivado");
  }
}