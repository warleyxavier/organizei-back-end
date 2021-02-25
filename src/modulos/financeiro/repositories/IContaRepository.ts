import IConta from "../entities/IConta";

export default interface IContaRepository {
  inserir(conta: IConta): Promise<void>;
}