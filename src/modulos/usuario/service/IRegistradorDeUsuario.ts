import IUsuario from "../entities/IUsuario";

export default interface IRegistradorDeUsuario {
  registrar(usuario: IUsuario): Promise<void>;
}