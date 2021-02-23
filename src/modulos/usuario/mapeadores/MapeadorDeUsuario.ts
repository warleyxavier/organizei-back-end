import Container, { Service } from "typedi";

import DadosDeRegistroDto from "../dto/DadosDeRegistroDto";
import IUsuario from "../entities/IUsuario";

@Service("usuario.mapeadorDeUsuario")
export default class MapeadorDeUsuario {

  public paraEntidade(dto: DadosDeRegistroDto): IUsuario {
    let usuario = Container.get<IUsuario>("usuario");
    usuario.EMail = dto.email;
    usuario.NomeCompleto = dto.nomeCompleto;
    usuario.atualizarSenha(dto.senha);
    return usuario;
  }

}