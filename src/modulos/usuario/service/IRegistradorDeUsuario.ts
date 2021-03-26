import IAcaoPosRegistroUsuarioCommand from "../commands/IAcaoPosRegistroUsuarioCommand";
import IUsuario from "../entities/IUsuario";

export default interface IRegistradorDeUsuario {
  adicionarAcaoPosRegistro(acao: IAcaoPosRegistroUsuarioCommand): void;
  registrar(usuario: IUsuario): Promise<void>;
}