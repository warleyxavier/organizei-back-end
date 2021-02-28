import ICategoria from "../entities/ICategoria";

export default interface IGerenciadorCategoria {
  pesquisarTodasCategorias(codigoUsuario: number): Promise<ICategoria[]>;
  pesquisarCategoriasDeDespesa(codigoUsuario: number): Promise<ICategoria[]>;
  criar(categoria: ICategoria, codigoUsuario: number): Promise<ICategoria>;
  atualizar(categoria: ICategoria, codigoCategoria: number, codigoUsuario: number): Promise<ICategoria>;
  excluir(codigoCategoria: number, codigoUsuario: number): Promise<void>;
}