import IConta from "../entities/IConta";

export default interface IGerenciadorConta {
  pesquisarContaPadrao(codigoUsuario: number): Promise<IConta>;
}