import { EBaseException } from "../../../core/exception/BaseException";

export class EContaComSaldoInsuficienteException extends EBaseException {
  constructor() {
    super("400", "Conta com saldo insuficiente para a operação");
  }
}