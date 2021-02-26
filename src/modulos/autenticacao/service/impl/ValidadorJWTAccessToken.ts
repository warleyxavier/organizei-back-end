import { verify, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Service } from "typedi";

import { EBaseException } from "../../../../core/exception/BaseException";

import { ETokenNaoInformadoException, ETokenExpiradoException, ETokenInvalidoException } from "../../exception";
import IValidadorAccessToken from "../IValidadorAccessToken";

@Service("autenticacao.validadorJWTAccessToken")
export default class ValidadorJWTAccessToken implements IValidadorAccessToken {
  public validar(token: string): number {
    const tokenLimpo: string = this.removerBearerDoToken(token);

    if (!tokenLimpo)
      throw new ETokenNaoInformadoException();

    try {
      const payload: any = verify(tokenLimpo, process.env.ACCESS_TOKEN_SECRET_KEY);
      const codigoEmpresa: number = payload.data;
      return codigoEmpresa;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new ETokenExpiradoException();

      if (error instanceof JsonWebTokenError)
        throw new ETokenInvalidoException();

      throw new EBaseException("401", error.message);
    }
  }

  private removerBearerDoToken(token: string): string {
    return token ? token.replace(/(b|B)earer/, '').trim() : '';
  }
}