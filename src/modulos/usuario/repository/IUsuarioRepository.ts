import IUsuario from "modulos/usuario/entities/IUsuario";

export default interface IUsuarioRepository {
  existeUsuarioComOEmail(email: string): Promise<boolean>;
  pesquisarPorEmail(email: string): Promise<IUsuario>;
  inserir(usuario: IUsuario): Promise<void>;
}