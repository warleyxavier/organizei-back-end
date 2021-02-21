import { sign } from "jsonwebtoken";
import { Service } from "typedi";

import IGeradorAccessToken from "../IGeradorAccessToken";

@Service("autenticacao.geradorJWTAccessToken")
export default class GeradorJWTAccessToken implements IGeradorAccessToken {
  public gerar(codigoUsuario: number): string {
    return sign({data: codigoUsuario}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: `${process.env.ACCESS_TOKEN_EXPIRATION_TIME}h`});
  }
}