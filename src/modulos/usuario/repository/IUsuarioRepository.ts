import IUsuario from "modulos/usuario/entities/IUsuario";

export default interface IUsuarioRepository {
  existeUsuarioComOEmail(email: string): Promise<boolean>;
  pesquisarPorCodigo(codigo: number): Promise<IUsuario>;
  pesquisarPorEmail(email: string): Promise<IUsuario>;
  inserir(usuario: IUsuario): Promise<IUsuario>;
}