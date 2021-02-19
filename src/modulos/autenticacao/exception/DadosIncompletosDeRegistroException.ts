import { EBaseException } from "../../../core/exception/BaseException";

export default class EDadosIncompletosDeRegistroException extends EBaseException {

  constructor(propriedade: string) {
    super("400", `propriedade ${propriedade} não foi informada`);
  }

}