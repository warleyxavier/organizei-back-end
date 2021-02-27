import ICategoria from "../entities/ICategoria";

export default interface IGerenciadorCategoria {
  pesquisarCategoriasDeDespesa(codigoUsuario: number): Promise<ICategoria[]>;
  criar(categoria: ICategoria, codigoUsuario: number): Promise<ICategoria>;
  excluir(codigoCategoria: number, codigoUsuario: number): Promise<void>;
}