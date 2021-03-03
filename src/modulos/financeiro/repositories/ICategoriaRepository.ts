import ICategoria from "../entities/ICategoria";

export default interface ICategoriaRepository {
  pesquisarPeloCodigo(codigo: number): Promise<ICategoria>;
  pesquisarTodasCategorias(codigoUsuario: number): Promise<ICategoria[]>;
  pesquisarCategoriasDeDespesa(codigoUsuario: number): Promise<ICategoria[]>;
  pesquisarCategoriaDeReceitaPadrao(codigoUsuario: number): Promise<ICategoria>;
  salvar(categoria: ICategoria): Promise<ICategoria>;
  excluir(codigo: number): void;
}