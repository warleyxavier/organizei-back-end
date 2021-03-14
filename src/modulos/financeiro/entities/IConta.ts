import IUsuario from "modulos/usuario/entities/IUsuario";

export default interface IConta {
  Codigo: number;
  Nome: string;
  Saldo: number;
  EhPadrao: boolean;
  Usuario: IUsuario;

  debitar(valor: number): void;
  creditar(valor: number): void;

  permiteDebitoDeValor(valor: number): boolean;
}