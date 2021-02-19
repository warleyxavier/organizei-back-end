import IUsuario from "modulos/common/entities/IUsuario";

export default interface IUsuarioRepository {
  existeUsuarioComOEmail(email: string): Promise<boolean>;
  inserir(usuario: IUsuario): Promise<IUsuario>;
}