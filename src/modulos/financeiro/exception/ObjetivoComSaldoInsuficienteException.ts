import { EBaseException } from "core/exception/BaseException";

export default class EObjetivoComSaldoInsuficienteException extends EBaseException {
  constructor() {
    super("400", "Objetivo com saldo insuficiente para a operação");
  }
}