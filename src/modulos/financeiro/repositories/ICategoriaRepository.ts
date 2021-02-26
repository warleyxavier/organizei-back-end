import ICategoria from "../entities/ICategoria";

export default interface ICategoriaRepository {
  salvar(categoria: ICategoria): Promise<ICategoria>;
}