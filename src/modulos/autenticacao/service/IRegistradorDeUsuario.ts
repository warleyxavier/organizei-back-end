import IUsuario from "../../common/entity/IUsuario";

export default interface IRegistradorDeUsuario {
  registrar(usuario: IUsuario): Promise<void>;
}