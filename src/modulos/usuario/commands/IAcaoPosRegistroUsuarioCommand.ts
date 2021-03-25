import IUsuario from "../entities/IUsuario";

export default interface IAcaoPosRegistroUsuarioCommand {
  executar(usuario: IUsuario): Promise<void>;
}