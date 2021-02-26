import { ExpressMiddlewareInterface } from "routing-controllers";
import Container from "typedi";

import IValidadorAccessToken from "../modulos/autenticacao/service/IValidadorAccessToken";

export default class AutenticacaoMiddleware implements ExpressMiddlewareInterface {

  private readonly CHAVE_AUTENTICACAO = "authorization"

  private validadorToken: IValidadorAccessToken;

  constructor() {
    this.validadorToken = Container.get<IValidadorAccessToken>("autenticacao.validadorJWTAccessToken");  
  }

  use(request: any, response: any, next: (err?: any) => any) {   
    const token: string = request.headers[this.CHAVE_AUTENTICACAO];
    const codigoUsuario = this.validadorToken.validar(token);
    request.codigoUsuario = codigoUsuario;
    next();
  }

}
