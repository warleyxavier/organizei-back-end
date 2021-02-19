import IUsuario from "modulos/common/entity/IUsuario";

export default interface IUsuarioRepository {
  existeUsuarioComOEmail(email: string): Promise<boolean>;
  inserir(usuario: IUsuario): Promise<void>;
}