import IUsuario from "modulos/usuario/entities/IUsuario";

export default interface IConta {
  Codigo: number;
  Nome: string;
  Saldo: number;
  Usuario: IUsuario;
}