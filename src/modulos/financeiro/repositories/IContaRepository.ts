import IConta from "../entities/IConta";

export default interface IContaRepository {
  pesquisarContaPadrao(codigoUsuario: number): Promise<IConta>;
  inserir(conta: IConta): Promise<void>;
  salvar(conta: IConta): Promise<IConta>;
}