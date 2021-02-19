import { EntityManager } from "typeorm";

export default interface IConexao {
  getGerenciador(): EntityManager;
}