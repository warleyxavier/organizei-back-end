import Container, { Service } from "typedi";

import IUsuario from "../../common/entity/IUsuario";
import DadosDeRegistroDto from "../dto/DadosDeRegistroDto";

@Service("autenticacao.mapeadorDeUsuario")
export default class MapeadorDeUsuario {

  public paraEntidade(dto: DadosDeRegistroDto): IUsuario {
    let usuario = Container.get<IUsuario>("common.usuario");
    usuario.EMail = dto.email;
    usuario.NomeCompleto = dto.nomeCompleto;
    usuario.atualizarSenha(dto.senha);
    return usuario;
  }

}